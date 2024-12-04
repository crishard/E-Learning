import React from 'react';
import { Course } from '../../types/course';

interface CourseFormProps {
    course: Course;
    onSubmit: (data: Partial<Course>) => Promise<void>;
    loading?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, loading }) => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const updateData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            level: formData.get('level') as Course['level'],
        };

        await onSubmit(updateData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título do Curso
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={course.title}
                    className="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={course.description}
                    rows={4}
                    className="mt-1 px-2 pt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Preço
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={course.price}
                    min="0"
                    step="0.01"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoria
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    defaultValue={course.category}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Nível
                </label>
                <select
                    id="level"
                    name="level"
                    defaultValue={course.level}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="beginner">Iniciante</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                </select>
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </form>
    );
};