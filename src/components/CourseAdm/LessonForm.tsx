import React, { useState } from 'react';
import { Course } from '../../types/course';

interface LessonFormProps {
    modules: Course['modules'];
    onSubmit: (data: {
        title: string;
        duration: number;
        videoUrl: string;
        moduleIndex: number;
    }) => Promise<void>;
}

export const LessonForm: React.FC<LessonFormProps> = ({ modules, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        duration: 0,
        videoUrl: '',
        moduleIndex: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.videoUrl.trim()) return;

        setLoading(true);
        try {
            await onSubmit(formData);
            setFormData({
                title: '',
                duration: 0,
                videoUrl: '',
                moduleIndex: 0
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'moduleIndex' || name === 'duration' ? Number(value) : value
        }));
    };

    if (!modules.length) {
        return <p className="text-gray-500">Adicione um módulo antes de criar aulas.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium">Adicionar Nova Aula</h3>
            
            <div>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Título da Aula"
                    required
                />
            </div>

            <div>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Duração (minutos)"
                    required
                    min="1"
                />
            </div>

            <div>
                <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="URL do Vídeo"
                    required
                />
            </div>

            <div>
                <select
                    name="moduleIndex"
                    value={formData.moduleIndex}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                >
                    {modules.map((module, index) => (
                        <option key={index} value={index}>
                            {module.title}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading || !formData.title.trim() || !formData.videoUrl.trim()}
            >
                {loading ? 'Adicionando...' : 'Adicionar Aula'}
            </button>
        </form>
    );
};