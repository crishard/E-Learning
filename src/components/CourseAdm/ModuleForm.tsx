import React, { useState } from 'react';

interface ModuleFormProps {
    onSubmit: (data: { title: string }) => Promise<void>;
}

export const ModuleForm: React.FC<ModuleFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onSubmit({ title });
            setTitle('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium">Adicionar Novo Módulo</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Título do Módulo"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading || !title.trim()}
                >
                    {loading ? 'Adicionando...' : 'Adicionar Módulo'}
                </button>
            </div>
        </form>
    );
};