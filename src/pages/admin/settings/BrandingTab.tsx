import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { APP_CONFIG } from '../../../config/app';

export function BrandingTab() {
  const [logos, setLogos] = useState<{
    main: string | null;
    header: string | null;
    favicon: string | null;
  }>({
    main: APP_CONFIG.branding.defaultLogo,
    header: APP_CONFIG.branding.defaultHeaderLogo,
    favicon: APP_CONFIG.branding.defaultFavicon
  });

  useEffect(() => {
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = logos.favicon || APP_CONFIG.branding.defaultFavicon;
    document.head.appendChild(link);
  }, [logos.favicon]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Configuración de Marca</h2>
      
      <div className="space-y-4">
        {/* Main Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Logo Principal (A Color)
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
              {logos.main ? (
                <img
                  src={logos.main}
                  alt="Logo principal"
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              {logos.main === APP_CONFIG.branding.defaultLogo ? 'Personalizar' : 'Cambiar'}
            </button>
          </div>
          {logos.main === APP_CONFIG.branding.defaultLogo && (
            <p className="mt-2 text-sm text-gray-500">
              Logo por defecto de la plataforma
            </p>
          )}
        </div>

        {/* Header Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Logo Barra Superior (Blanco)
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="flex-shrink-0 h-16 w-16 bg-indigo-900 rounded-lg flex items-center justify-center">
              {logos.header ? (
                <img
                  src={logos.header}
                  alt="Logo header"
                  className="h-14 w-14 object-contain"
                />
              ) : (
                <Upload className="h-8 w-8 text-white" />
              )}
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cambiar
            </button>
          </div>
        </div>

        {/* Favicon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Favicon
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
              {logos.favicon ? (
                <img
                  src={logos.favicon}
                  alt="Favicon"
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <Upload className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cambiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}