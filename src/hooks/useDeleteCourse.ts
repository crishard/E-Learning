import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';

export const useDeleteCourse = (courseId: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDeleteCourse = async () => {
        if (!courseId) return;

        setLoading(true);
        try {
            await deleteDoc(doc(db, 'courses', courseId));
            toast.success('Curso excluído com sucesso!');
            navigate('/meus-cursos');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Erro ao excluir o curso');
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleDeleteCourse };
};
