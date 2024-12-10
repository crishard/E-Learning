import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../lib/firebase';
import { Course, Module } from '../types/course';

export const useUpdateCourse = (course: Course | null, courseId: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const [updatedCourse, setUpdatedCourse] = useState<Course | null>(course || null);

    const calculateCourseDuration = (modules: Module[]) => {
        // Adicione uma verificação segura para evitar erros
        return modules.reduce((totalDuration, module) => {
            // Verifique se lessons existe e é um array
            const moduleDuration = (module.lessons || []).reduce(
                (moduleLessonsDuration, lesson) => moduleLessonsDuration + (lesson.duration || 0),
                0
            );
            return totalDuration + moduleDuration;
        }, 0) / 60;
    };

    const handleUpdateCourse = async (updatedData: Partial<Course>) => {
        if (!course || !courseId) return;

        setLoading(true);
        try {
            // Garantir que modules seja um array válido
            const sanitizedModules = (updatedData.modules || []).map(module => ({
                ...module,
                lessons: module.lessons || []
            }));

            const finalUpdatedData = {
                ...updatedData,
                modules: sanitizedModules
            };

            await updateDoc(doc(db, 'courses', courseId), finalUpdatedData);
            
            setUpdatedCourse(prevCourse => ({
                ...(prevCourse || course),
                ...finalUpdatedData
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
        if (!course || !courseId) return;
    
        const currentModules = updatedCourse?.modules || [];
    
        const newModule = { 
            title: moduleData.title, 
            lessons: [] 
        };
    
        const updatedModules = [...currentModules, newModule];
    
        try {
            const duration = calculateCourseDuration(updatedModules);
    
            
            await handleUpdateCourse({
                modules: updatedModules,
                duration
            });
    
            
            setUpdatedCourse(prevCourse => ({
                ...(prevCourse || course),
                modules: updatedModules,
                duration
            }));
    
            toast.success('Módulo adicionado com sucesso!');
            
            window.location.reload();
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
        if (!course || !course.modules) return;

        const currentModules = course.modules || [];

        console.log('Current Modules Length:', currentModules.length);
        console.log('Module Index:', lessonData.moduleIndex);
    
        
        if (lessonData.moduleIndex < 0 || lessonData.moduleIndex >= currentModules.length) {
            toast.error(`Índice de módulo inválido. Índice: ${lessonData.moduleIndex}, Número de módulos: ${currentModules.length}`);
            return;
        }

      

        const updatedModules = JSON.parse(JSON.stringify(currentModules));

       
        if (!updatedModules[lessonData.moduleIndex].lessons) {
            updatedModules[lessonData.moduleIndex].lessons = [];
        }

        
        updatedModules[lessonData.moduleIndex].lessons.push({
            id: Date.now().toString(),
            title: lessonData.title,
            duration: lessonData.duration,
            videoUrl: lessonData.videoUrl,
            completed: false,
        });

        try {
            const duration = calculateCourseDuration(updatedModules);
            
            await handleUpdateCourse({
                modules: updatedModules,
                duration
            });

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