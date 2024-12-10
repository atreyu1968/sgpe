import React, { useState } from 'react';
import { Plus, Upload, Download, Pencil, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import { EducationalCenter } from '../../types/centers';
import { NewCenterModal } from '../../components/centers/NewCenterModal';

export function CentersPanel() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const queryClient = useQueryClient();

  const { data: centers = [], isLoading, error: centersError } = useQuery({
    queryKey: ['centers'],
    queryFn: async () => {
      const { data } = await axios.get('/api/centers');
      return data as EducationalCenter[];
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/centers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['centers'] });
    }
  });

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/api/centers/template', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'plantilla_centros.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsImporting(true);
      await axios.post('/api/centers/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      queryClient.invalidateQueries({ queryKey: ['centers'] });
    } catch (error) {
      console.error('Error importing centers:', error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Registros Maestros</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestión de centros educativos y otros datos maestros
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Registro
          </button>
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Importar Excel
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isImporting}
            />
          </label>
          <button
            type="button"
            onClick={downloadTemplate}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar Plantilla
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Centro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Isla
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provincia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  Cargando centros...
                </td>
              </tr>
            ) : centers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay centros registrados
                </td>
              </tr>
            ) : (
              centers.map((center) => (
                <tr key={center.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {center.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {center.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {center.center_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {center.island}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {center.province}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {center.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {center.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('¿Está seguro de eliminar este centro?')) {
                          deleteMutation.mutate(center.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NewCenterModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
    </div>
  );
}