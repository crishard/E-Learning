import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../lib/firebase';
import { Course, Module } from '../types/course';

export const useUpdateCourse = (course: Course | null, courseId: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const [updatedCourse, setUpdatedCourse] = useState<Course | null>(course);

    useEffect(() => {
        if (course && (!updatedCourse || course.id !== updatedCourse.id)) {
            setUpdatedCourse(course);
        }
    }, [course]);

    const calculateCourseDuration = (modules: Module[]): number => {
        return modules.reduce((totalDuration, module) => {
            const moduleDuration = (module.lessons || []).reduce(
                (moduleLessonsDuration, lesson) => moduleLessonsDuration + (lesson.duration || 0),
                0
            );
            return totalDuration + moduleDuration;
        }, 0) / 60;
    };

    const handleUpdateCourse = async (updatedData: Partial<Course>): Promise<void> => {
        if (!updatedCourse || !courseId) return;
    
        setLoading(true);
        try {
            const modulesToUse = updatedData.modules || updatedCourse.modules || [];
            
            const sanitizedModules = modulesToUse.map(module => ({
                ...module,
                lessons: module.lessons || []
            }));
    
            const finalUpdatedData = {
                ...updatedCourse,
                ...updatedData,
                modules: sanitizedModules,
                duration: calculateCourseDuration(sanitizedModules)
            };
    
            // Convert to a plain object for Firestore
            const firestoreData = {
                title: finalUpdatedData.title,
                description: finalUpdatedData.description,
                modules: finalUpdatedData.modules,
                userId: finalUpdatedData.userId,
                instructor: finalUpdatedData.instructor,
                thumbnail: finalUpdatedData.thumbnail,
                price: finalUpdatedData.price,
                category: finalUpdatedData.category,
                level: finalUpdatedData.level,
                duration: finalUpdatedData.duration,
                rating: finalUpdatedData.rating,
                totalRatings: finalUpdatedData.totalRatings,
                numberOfStudents: finalUpdatedData.numberOfStudents
            };
    
            // Update in Firebase
            await updateDoc(doc(db, 'courses', courseId), firestoreData);
            
            setUpdatedCourse(finalUpdatedData as Course);
            toast.success('Curso atualizado!');
        } catch (error) {
            console.error('Error updating course:', error);
            toast.error('Erro ao atualizar o curso');
        } finally {
            setLoading(false);
        }
    };

    const handleAddModule = async (moduleData: { title: string }) => {
        if (!updatedCourse || !courseId) return;
    
        const currentModules = [...(updatedCourse.modules || [])];
    
        const newModule: Module = {
            id: Date.now().toString(),
            title: moduleData.title,
            lessons: []
        };
    
        const updatedModules = [...currentModules, newModule];
    
        try {
            await handleUpdateCourse({
                modules: updatedModules
            });
            toast.success('Módulo adicionado com sucesso!');
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
        if (!courseId || !updatedCourse) {
            toast.error('Curso não encontrado');
            return;
        }
    
        const currentModules = [...updatedCourse.modules];
    
        if (lessonData.moduleIndex < 0 || lessonData.moduleIndex >= currentModules.length) {
            toast.error('Índice de módulo inválido');
            return;
        }
    
        const updatedModules = currentModules.map((module, index) => {
            if (index === lessonData.moduleIndex) {
                return {
                    ...module,
                    lessons: [
                        ...(module.lessons || []),
                        {
                            id: Date.now().toString(),
                            title: lessonData.title,
                            duration: lessonData.duration,
                            videoUrl: lessonData.videoUrl,
                            completed: false
                        }
                    ]
                };
            }
            return module;
        });
    
        try {
            await handleUpdateCourse({
                modules: updatedModules
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