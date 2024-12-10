import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../../api/axios';
import { SERVER_CONFIG } from '../../../config/server';
import { Database, Edit2, Plus, Trash2, Download, Upload, RefreshCw } from 'lucide-react';

export function DatabaseTab() {
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');

  const { data: tables, isLoading: isLoadingTables, error: tablesError } = useQuery({
    queryKey: ['database', 'tables'],
    queryFn: async () => {
      const { data } = await axios.get(`${SERVER_CONFIG.BASE_URL}/api/database/tables`);
      return data as string[];
    },
    retry: 1
  });

  const { data: tableData, isLoading: isLoadingData, error: tableError } = useQuery({
    queryKey: ['database', 'table', selectedTable],
    queryFn: async () => {
      if (!selectedTable) return null;
      const { data } = await axios.get(`${SERVER_CONFIG.BASE_URL}/api/database/tables/${selectedTable}`);
      return data;
    },
    enabled: !!selectedTable,
    retry: 1
  });

  if (isLoadingTables || !tables) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (tablesError) {
    return (
      <div className="text-center text-red-500 py-8">
        Error al cargar las tablas. Por favor, intente nuevamente.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Database className="h-6 w-6 text-gray-600" />
        <div className="flex-1">
          <h2 className="text-lg font-medium">SQLite Studio</h2>
          <p className="text-sm text-gray-500">Gestión avanzada de base de datos</p>
        </div>
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Editor SQL
          </button>
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </button>
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="flex-1">
              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                placeholder="SELECT * FROM table_name"
              />
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ejecutar
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Presiona Ctrl + Enter para ejecutar la consulta
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        <div className="w-64">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Tablas</h3>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              title="Nueva tabla"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            {Array.isArray(tables) ? tables.map(table => (
              <div
                key={table}
                className={`
                  flex items-center justify-between px-3 py-2 rounded text-sm
                  ${selectedTable === table
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <button
                  onClick={() => setSelectedTable(table)}
                  className="flex-1 text-left"
                >
                  {table}
                </button>
                <button
                  className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100"
                  title="Eliminar tabla"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            )) : (
              <div className="text-sm text-gray-500 text-center py-4">
                No hay tablas disponibles
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          {selectedTable && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {selectedTable}
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {isLoadingData ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                  </div>
                ) : tableError ? (
                  <div className="text-center text-red-500 py-4">
                    Error al cargar los datos de la tabla
                  </div>
                ) : tableData ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {tableData.columns && Object.keys(tableData.columns).map(column => (
                            <th
                              key={column}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.rows && tableData.rows.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((value, j) => (
                              <td
                                key={j}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              >
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}