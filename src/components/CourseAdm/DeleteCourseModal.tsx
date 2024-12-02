import React from 'react';

interface DeleteCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading?: boolean;
}

export const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                <p className="text-gray-600 mb-6">
                    Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
};