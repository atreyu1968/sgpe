import React from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}