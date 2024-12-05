import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseForm } from '../../components/courseAdm/CourseForm';
import { DeleteCourse } from '../../components/courseAdm/DeleteCourse';
import { DeleteCourseModal } from '../../components/courseAdm/DeleteCourseModal';
import { LoadingUpdateForm } from '../../components/courseAdm/LoadingUpdateForm';
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

    if (loading) return <LoadingUpdateForm />;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    console.log('Course:', course);
    console.log('UpdatedCourse:', updatedCourse);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Editar Curso</h1>
            <div className="space-y-8">
                <CourseForm course={course || updatedCourse} onSubmit={handleUpdateCourse} loading={updateLoading} />
                <ModulesAndLessons
                    handleAddModule={handleAddModule}
                    handleAddLesson={handleAddLesson}
                    modules={updatedCourse?.modules || course?.modules}
                />
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
