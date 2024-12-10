import React from 'react';
import { USER_ROLES } from '../../../config/constants';

const permissions = [
  { id: 'view_projects', label: 'Ver Proyectos' },
  { id: 'edit_projects', label: 'Editar Proyectos' },
  { id: 'delete_projects', label: 'Eliminar Proyectos' },
  { id: 'evaluate_projects', label: 'Evaluar Proyectos' },
  { id: 'manage_users', label: 'Gestionar Usuarios' },
  { id: 'view_reports', label: 'Ver Reportes' },
  { id: 'export_data', label: 'Exportar Datos' },
];

export function PermissionsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Permisos por Rol</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permiso
              </th>
              {Object.values(USER_ROLES).map(role => (
                <th
                  key={role}
                  className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.map(permission => (
              <tr key={permission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {permission.label}
                </td>
                {Object.values(USER_ROLES).map(role => (
                  <td key={`${permission.id}-${role}`} className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-4">
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}