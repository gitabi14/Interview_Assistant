'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => boolean;
  signup: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  aiMode: 'LIVE_AI' | 'DEMO_MODE' | 'ERROR';
  setAiMode: (mode: 'LIVE_AI' | 'DEMO_MODE' | 'ERROR') => void;
  apiKeyConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'user-demo-1',
  name: 'Kabilan K A',
  email: 'demo@prepforge.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'Candidate',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aiMode, setAiMode] = useState<'LIVE_AI' | 'DEMO_MODE' | 'ERROR'>('DEMO_MODE');
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage for persistent auth session
    try {
      const storedAuth = localStorage.getItem('prepforge_auth');
      const storedUser = localStorage.getItem('prepforge_user');
      const storedKey = localStorage.getItem('prepforge_gemini_key') || localStorage.getItem('prepforge_openai_key');

      if (storedAuth === 'true' && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        // By default on initial load, provide access or set demo session
        setUser(DEMO_USER);
        setIsAuthenticated(true);
        localStorage.setItem('prepforge_auth', 'true');
        localStorage.setItem('prepforge_user', JSON.stringify(DEMO_USER));
      }

      if (storedKey) {
        setApiKeyConfigured(true);
        setAiMode('LIVE_AI');
      } else {
        setAiMode('DEMO_MODE');
      }
    } catch (e) {
      setUser(DEMO_USER);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password?: string): boolean => {
    // Demo login check
    const loggedUser: User = {
      ...DEMO_USER,
      email: email || 'demo@prepforge.ai',
      name: email === 'demo@prepforge.ai' ? 'Kabilan K A' : email.split('@')[0],
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('prepforge_auth', 'true');
    localStorage.setItem('prepforge_user', JSON.stringify(loggedUser));
    return true;
  };

  const signup = (name: string, email: string, password?: string): boolean => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || 'New Candidate',
      email: email || 'candidate@prepforge.ai',
      avatarUrl: DEMO_USER.avatarUrl,
      role: 'Candidate',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('prepforge_auth', 'true');
    localStorage.setItem('prepforge_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('prepforge_auth');
    localStorage.removeItem('prepforge_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        aiMode,
        setAiMode,
        apiKeyConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
