import React from 'react';
import { Module } from '../../types/course';

interface LessonFormContentProps {
  loading: boolean;
  formData: {
    title: string;
    duration: number;
    videoUrl: string;
    moduleIndex: number;
  };
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  modules: Module[];
}

export const LessonFormContent: React.FC<LessonFormContentProps> = ({
  loading,
  formData,
  handleSubmit,
  handleChange,
  modules,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Adicionar Nova Aula</h3>
      
      <div>
        <label htmlFor="moduleIndex" className="block text-sm font-medium text-gray-700 mb-1">
          Módulo
        </label>
        <select
          id="moduleIndex"
          name="moduleIndex"
          value={formData.moduleIndex}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {modules.map((module, index) => (
            <option key={module.id} value={index}>
              {module.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título da Aula
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duração (minutos)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
          URL do Vídeo
        </label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adicionando...' : 'Adicionar Aula'}
      </button>
    </form>
  );
};