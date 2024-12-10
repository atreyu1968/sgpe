import React, { useState } from 'react';
import { Settings as SettingsIcon, Image, Mail, Shield, Key, FileText, Database } from 'lucide-react';
import { BrandingTab } from './settings/BrandingTab';
import { EmailTab } from './settings/EmailTab';
import { PermissionsTab } from './settings/PermissionsTab';
import { DatabaseTab } from './settings/DatabaseTab';
import { RegistrationCodesTab } from './settings/RegistrationCodesTab';
import { DocumentationTab } from './settings/DocumentationTab';

type TabId = 'branding' | 'email' | 'permissions' | 'registration' | 'documentation' | 'database';

const tabs = [
  { id: 'branding' as TabId, label: 'Marca', icon: Image },
  { id: 'email' as TabId, label: 'Correo', icon: Mail },
  { id: 'permissions' as TabId, label: 'Permisos', icon: Shield },
  { id: 'database' as TabId, label: 'Base de Datos', icon: Database },
  { id: 'registration' as TabId, label: 'Códigos de Registro', icon: Key },
  { id: 'documentation' as TabId, label: 'Documentación', icon: FileText }
];

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('branding');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="h-6 w-6 text-gray-600" />
        <h1 className="text-2xl font-semibold">Configuración</h1>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className={`
                -ml-0.5 mr-2 h-5 w-5
                ${activeTab === id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              {label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'branding' && <BrandingTab />}
          {activeTab === 'email' && <EmailTab />}
          {activeTab === 'permissions' && <PermissionsTab />}
          {activeTab === 'database' && <DatabaseTab />}
          {activeTab === 'registration' && <RegistrationCodesTab />}
          {activeTab === 'documentation' && <DocumentationTab />}
        </div>
      </div>
    </div>
  );
}