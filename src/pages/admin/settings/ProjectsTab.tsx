import React from 'react';
import { FileText, Users, Calendar } from 'lucide-react';

export function ProjectsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Configuración de Proyectos</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Estadísticas */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Proyectos Totales
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Participantes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Convocatorias Activas
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de Campos */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Campos del Proyecto
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Configura los campos que se mostrarán en el formulario de proyecto</p>
          </div>
          <div className="mt-5">
            <div className="space-y-4">
              {/* Campo Título */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="title"
                    name="title"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked
                    disabled
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="title" className="font-medium text-gray-700">
                    Título
                  </label>
                  <p className="text-gray-500">Campo obligatorio</p>
                </div>
              </div>

              {/* Campo Descripción */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="description"
                    name="description"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked
                    disabled
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="description" className="font-medium text-gray-700">
                    Descripción
                  </label>
                  <p className="text-gray-500">Campo obligatorio</p>
                </div>
              </div>

              {/* Campo Objetivos */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="objectives"
                    name="objectives"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="objectives" className="font-medium text-gray-700">
                    Objetivos
                  </label>
                  <p className="text-gray-500">Lista de objetivos del proyecto</p>
                </div>
              </div>

              {/* Campo Presupuesto */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="budget"
                    name="budget"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="budget" className="font-medium text-gray-700">
                    Presupuesto
                  </label>
                  <p className="text-gray-500">Desglose de costos estimados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}