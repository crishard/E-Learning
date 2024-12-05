import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../lib/firebase';

interface UseDeleteCourseResult {
    handleDeleteCourse: (courseId: string) => Promise<void>;
    loading: boolean;
}

export const useDeleteCourse = (): UseDeleteCourseResult => {
    const [loading, setLoading] = useState(false);

    const handleDeleteCourse = async (courseId: string) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'courses', courseId));
            toast.success('Curso excluído com sucesso!');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Erro ao excluir o curso');
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteCourse, loading };
};
