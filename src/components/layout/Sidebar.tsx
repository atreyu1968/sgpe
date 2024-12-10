import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDocumentation } from '../../contexts/DocumentationContext';
import { 
  Users, 
  Award, 
  Database,
  FolderKanban,
  ClipboardList, 
  Settings,
  UserPlus,
  FileText
} from 'lucide-react';

export function Sidebar() {
  const { isEnabled, documentationUrl } = useDocumentation();

  const menuItems = [
  { 
    icon: Users, 
    label: 'Usuarios', 
    path: '/dashboard/users' 
  },
  {
    icon: Database,
    label: 'Registros Maestros',
    path: '/dashboard/centers'
  },
  { 
    icon: Award, 
    label: 'Convocatorias', 
    path: '/dashboard/contests' 
  },
  { 
    icon: FolderKanban, 
    label: 'Proyectos', 
    path: '/dashboard/projects' 
  },
  { 
    icon: ClipboardList, 
    label: 'Evaluaciones', 
    path: '/dashboard/evaluations' 
  },
  { 
    icon: Settings, 
    label: 'Configuración', 
    path: '/dashboard/settings' 
  },
  ...(isEnabled && documentationUrl ? [{
    icon: FileText,
    label: 'Documentación',
    path: documentationUrl,
    external: true
  }] : [])
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            target={item.external ? '_blank' : undefined}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
                isActive ? 'bg-gray-700 text-white' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}