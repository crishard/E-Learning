import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/courseAdm/ConfirmDialog';
import { CourseCard } from '../../components/courseAdm/CourseCard';
import { useDeleteCourse } from '../../hooks/useDeleteConfirm';
import { useFetchCourses } from '../../hooks/useFetchCourses';
import { useAuthStore } from '../../store/authStore';

export const MyCoursesCreated: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { courses, loading, error } = useFetchCourses();
  const { handleDeleteCourse } = useDeleteCourse();

  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFilteredCourses(courses.filter((course) => course.userId === user.uid));
    }
  }, [user, courses]);

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      await handleDeleteCourse(courseToDelete);
      setFilteredCourses(filteredCourses.filter((course) => course.id !== courseToDelete));
    }
    setIsDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  if (!user) {
    return <p>Acesso não autorizado</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Cursos</h1>
      <div className="flex flex-wrap gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={(id) => navigate(`/editar-curso/${id}`)}
            onDelete={handleDeleteClick}
          />
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
