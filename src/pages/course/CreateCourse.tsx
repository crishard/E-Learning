import React from 'react';
import { CreateCourseForm } from '../../components/createCourse/CreateCourseForm';
import { useAuthStore } from '../../store/authStore';

export const CreateCourse: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== 'instructor') {
    return <p>Acesso não autorizado</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Criar Novo Curso</h1>
      <CreateCourseForm />
    </div>
  );
};

