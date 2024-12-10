import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useDocumentation } from '../../../contexts/DocumentationContext';

export function DocumentationTab() {
  const { isEnabled, documentationUrl, setDocumentation } = useDocumentation();
  const [url, setUrl] = useState(documentationUrl);
  const [enabled, setEnabled] = useState(isEnabled);

  const handleSave = () => {
    setDocumentation(enabled, url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Configuración de Documentación</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Mostrar Enlace de Documentación
            </label>
            <p className="text-sm text-gray-500">
              Habilita o deshabilita el acceso a la documentación externa
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`${
              enabled ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <span
              className={`${
                enabled ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL de Documentación
          </label>
          <div className="mt-1">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="https://docs.ejemplo.com"
              disabled={!enabled}
            />
          </div>
        </div>

        {enabled && url && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ExternalLink className="h-4 w-4" />
            <span>La documentación se abrirá en una nueva pestaña</span>
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}