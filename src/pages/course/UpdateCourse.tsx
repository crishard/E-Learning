import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseForm } from '../../components/courseAdm/CourseForm';
import { DeleteCourse } from '../../components/courseAdm/DeleteCourse';
import { DeleteCourseModal } from '../../components/courseAdm/DeleteCourseModal';
import { LoadingSpinner } from '../../components/courseAdm/LoadingSpinner';
import { ModulesAndLessons } from '../../components/courseAdm/ModulesAndLessons';
import { useDeleteCourse } from '../../hooks/useDeleteCourse';
import { useFetchCourses } from '../../hooks/useFetchCourses';
import { useUpdateCourse } from '../../hooks/useUpdateCourse';

export const UpdateCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { course, loading, error } = useFetchCourses(id);
    const { loading: updateLoading, handleUpdateCourse, handleAddModule, handleAddLesson, updatedCourse } = useUpdateCourse(course, id);
    const { loading: deleteLoading, handleDeleteCourse } = useDeleteCourse(id);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'edit-info' | 'edit-modules'>('edit-info'); // Estado para alternar os formulários

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    console.log('Course:', course);
    console.log('UpdatedCourse:', updatedCourse);

    return (
        <div className="p-6">
            {/* Botões para alternar entre as seções */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setActiveTab('edit-info')}
                    className={`px-4 py-2 rounded-l-md ${activeTab === 'edit-info' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Editar Curso
                </button>
                <button
                    onClick={() => setActiveTab('edit-modules')}
                    className={`px-4 py-2 rounded-r-md ${activeTab === 'edit-modules' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Adicionar Módulos e Aulas
                </button>
            </div>

            <div className="p-6 rounded-md">
                {activeTab === 'edit-info' && (
                    <CourseForm course={course || updatedCourse} onSubmit={handleUpdateCourse} loading={updateLoading} />
                )}
                {activeTab === 'edit-modules' && (
                    <ModulesAndLessons
                        handleAddModule={handleAddModule}
                        handleAddLesson={handleAddLesson}
                        modules={updatedCourse?.modules || course?.modules}
                    />
                )}
            </div>

            <div className='flex justify-center'>
            <DeleteCourse loading={deleteLoading} setShowDeleteModal={setShowDeleteModal} />
            </div>
            
            <DeleteCourseModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteCourse}
                loading={deleteLoading}
            />
        </div>
    );
};
