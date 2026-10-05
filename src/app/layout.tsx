import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../store/AuthContext';
import { PrepForgeProvider } from '../store/PrepForgeContext';

export const metadata: Metadata = {
  title: 'PrepForge AI — Interview Intelligence Platform',
  description: 'AI-Powered Company-Specific Interview Intelligence & Candidate Operating System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080a12] text-slate-100 min-h-screen antialiased selection:bg-purple-600 selection:text-white">
        <AuthProvider>
          <PrepForgeProvider>
            {children}
          </PrepForgeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
