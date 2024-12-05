import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../lib/firebase';
import { Course } from '../types/course';

export const useUpdateCourse = (course: Course | null, courseId: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const [updatedCourse, setUpdatedCourse] = useState<Course | null>(course || null);

    const handleUpdateCourse = async (updatedData: Partial<Course>) => {
        if (!course || !courseId) return;

        setLoading(true);
        try {
            await updateDoc(doc(db, 'courses', courseId), updatedData);
            setUpdatedCourse(prevCourse => ({
                ...(prevCourse || course),
                ...updatedData
            }));

            toast.success('Curso atualizado com sucesso!');
        } catch (error) {
            console.error('Error updating course:', error);
            toast.error('Erro ao atualizar o curso');
        } finally {
            setLoading(false);
        }
    };

    const handleAddModule = async (moduleData: { title: string }) => {
        if (!course) return;

        const updatedModules = [...(course.modules || []), { ...moduleData, lessons: [] }];

        try {
            await handleUpdateCourse({ modules: updatedModules });
            toast.success('Módulo adicionado com sucesso!');
            setUpdatedCourse(prevCourse => {
                if (!prevCourse) return { ...course, modules: updatedModules };
                return {
                    ...prevCourse,
                    modules: updatedModules
                };
            });
        } catch (error) {
            console.error('Error adding module:', error);
            toast.error('Erro ao adicionar módulo');
        }
    };

    const handleAddLesson = async (lessonData: {
        title: string;
        duration: number;
        videoUrl: string;
        moduleIndex: number;
    }) => {
        if (!course) return;

        const updatedModules = [...(course.modules || [])];
        updatedModules[lessonData.moduleIndex].lessons.push({
            id: Date.now().toString(),
            title: lessonData.title,
            duration: lessonData.duration,
            videoUrl: lessonData.videoUrl,
            completed: false,
        });

        try {
            await handleUpdateCourse({ modules: updatedModules });
            toast.success('Aula adicionada com sucesso!');
        } catch (error) {
            console.error('Error adding lesson:', error);
            toast.error('Erro ao adicionar aula');
        }
    };

    return {
        loading,
        handleUpdateCourse,
        handleAddModule,
        handleAddLesson,
        updatedCourse
    };
};
