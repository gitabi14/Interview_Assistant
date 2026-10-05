import os
import json
import time
from typing import Dict, Any, List, Optional
from datetime import datetime

class MongoDBService:
    def __init__(self):
        self.mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        self.db_name = os.getenv("MONGODB_DB_NAME", "prepforge_ai")
        self.connected = False
        self.client = None
        self.db = None
        
        # Local JSON disk persistence directory as bulletproof backup/persistence layer
        self.backup_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "db_storage")
        os.makedirs(self.backup_dir, exist_ok=True)

        try:
            from pymongo import MongoClient
            # Quick timeout check for local MongoDB
            self.client = MongoClient(self.mongo_uri, serverSelectionTimeoutMS=1000)
            self.client.admin.command('ping')
            self.db = self.client[self.db_name]
            self.connected = True
            print(f"[MongoDB] Successfully connected to {self.mongo_uri} (DB: {self.db_name})")
        except Exception as e:
            print(f"[MongoDB] Notice: Native MongoDB daemon unreachable ({e}). Using persistent local disk-store fallback.")
            self.connected = False

    def get_status(self) -> Dict[str, Any]:
        return {
            "status": "Connected" if self.connected else "Active (Persistent Disk Store Fallback)",
            "database_name": self.db_name,
            "connected_to_daemon": self.connected,
            "storage_path": self.backup_dir,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

    def save_candidate_session(self, session_id: str, session_data: Dict[str, Any]) -> bool:
        session_data["updated_at"] = time.strftime("%Y-%m-%d %H:%M:%S")
        
        # 1. MongoDB collection insert/update
        if self.connected and self.db is not None:
            try:
                self.db.candidate_sessions.update_one(
                    {"session_id": session_id},
                    {"$set": session_data},
                    upsert=True
                )
            except Exception as e:
                print(f"[MongoDB] Error saving to MongoDB: {e}")

        # 2. Local Disk persistence
        try:
            file_path = os.path.join(self.backup_dir, f"session_{session_id}.json")
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(session_data, f, indent=2, default=str)
            return True
        except Exception as e:
            print(f"[DB] Error writing disk state: {e}")
            return False

    def get_candidate_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        # 1. Check MongoDB
        if self.connected and self.db is not None:
            try:
                doc = self.db.candidate_sessions.find_one({"session_id": session_id})
                if doc:
                    doc.pop("_id", None)
                    return doc
            except Exception as e:
                print(f"[MongoDB] Error fetching from MongoDB: {e}")

        # 2. Check Disk Store
        file_path = os.path.join(self.backup_dir, f"session_{session_id}.json")
        if os.path.exists(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"[DB] Error reading disk state: {e}")
        return None

db_service = MongoDBService()
