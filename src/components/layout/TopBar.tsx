import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LogOut } from 'lucide-react';
import { APP_CONFIG } from '../../config/app';

export function TopBar() {
  const { user, logout } = useAuth();
  const { translations } = useLanguage();

  return (
    <div className="bg-indigo-900 text-white h-16">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={APP_CONFIG.branding.defaultHeaderLogo}
            alt="Logo"
            className="h-8 w-auto filter brightness-0 invert"
          />
          <span className="text-xl font-semibold">
            Premios Emprendimiento
          </span>
        </div>
        
        <div className="flex-1 flex justify-center">
          <span className="text-lg">Convocatoria 2024 - Activa</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-indigo-200">{user?.role}</div>
          </div>
          <button
            onClick={logout}
            className="p-2 hover:bg-indigo-800 rounded-full"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}