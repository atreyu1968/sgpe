import React from 'react';

export function EmailTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Configuración de Correo</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Servidor SMTP
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="smtp.ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Puerto
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="587"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo Remitente
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="noreply@ejemplo.com"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  );
}