import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { useAuthStore } from '../../store/authStore';
import { Course } from '../../types/course';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export const MyCoursesCreated: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    if (!user) return;

    const q = query(collection(db, 'courses'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const fetchedCourses: Course[] = [];
    querySnapshot.forEach((doc) => {
      fetchedCourses.push({ id: doc.id, ...doc.data() } as Course);
    });
    setCourses(fetchedCourses);
  };

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        await deleteDoc(doc(db, 'courses', courseToDelete));
        setCourses(courses.filter(course => course.id !== courseToDelete));
        toast.success('Curso excluído com sucesso!');
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Erro ao excluir o curso');
      }
    }
    setIsDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  if (!user) {
    return <p>Acesso não autorizado</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Cursos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover mb-4 rounded"/>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigate(`/editar-curso/${course.id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDeleteClick(course.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

