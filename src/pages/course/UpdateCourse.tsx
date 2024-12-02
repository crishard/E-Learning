import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseForm } from '../../components/CourseAdm/CourseForm';
import { DeleteCourseModal } from '../../components/CourseAdm/DeleteCourseModal';
import { LessonForm } from '../../components/CourseAdm/LessonForm';
import { ModuleForm } from '../../components/CourseAdm/ModuleForm';
import { db } from '../../lib/firebase';
import { useAuthStore } from '../../store/authStore';
import { Course } from '../../types/course';

export const UpdateCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const [course, setCourse] = useState<Course | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && id) {
            fetchCourse();
        }
    }, [user, id]);

    const fetchCourse = async () => {
        if (!user || !id) return;

        try {
            const docRef = doc(db, 'courses', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
            } else {
                toast.error('Curso não encontrado');
            }
        } catch (error) {
            console.error('Error fetching course:', error);
            toast.error('Erro ao carregar o curso');
        }
    };

    const handleUpdateCourse = async (updatedData: Partial<Course>) => {
        if (!user || !course || !id) return;
        setLoading(true);

        try {
            await updateDoc(doc(db, 'courses', id), updatedData);
            setCourse(prev => prev ? { ...prev, ...updatedData } : null);
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
        } catch (error) {
            console.error('Error adding module:', error);
            toast.error('Erro ao adicionar módulo');
        }
    };

    const handleAddLesson = async (lessonData: { 
        title: string; 
        duration: number; 
        videoUrl: string; 
        moduleIndex: number 
    }) => {
        if (!course) return;

        const updatedModules = [...(course.modules || [])];
        updatedModules[lessonData.moduleIndex].lessons.push({
            id: Date.now().toString(),
            title: lessonData.title,
            duration: lessonData.duration,
            videoUrl: lessonData.videoUrl,
            completed: false
        });

        try {
            await handleUpdateCourse({ modules: updatedModules });
            toast.success('Aula adicionada com sucesso!');
        } catch (error) {
            console.error('Error adding lesson:', error);
            toast.error('Erro ao adicionar aula');
        }
    };

    const handleDeleteCourse = async () => {
        if (!id) return;
        setLoading(true);

        try {
            await deleteDoc(doc(db, 'courses', id));
            toast.success('Curso excluído com sucesso!');
            navigate('/meus-cursos');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Erro ao excluir o curso');
        } finally {
            setLoading(false);
        }
    };

    if (!user || !course) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Editar Curso</h1>
            
            <div className="space-y-8">
                <CourseForm 
                    course={course} 
                    onSubmit={handleUpdateCourse}
                    loading={loading}
                />

                <div className="border-t pt-8">
                    <h2 className="text-xl font-semibold mb-6">Módulos e Aulas</h2>
                    
                    <div className="space-y-6">
                        {course.modules?.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="bg-white shadow rounded-lg p-4">
                                <h3 className="text-lg font-medium mb-2">{module.title}</h3>
                                <ul className="space-y-2">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <li key={lessonIndex} className="flex items-center gap-2 text-gray-700">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {lesson.title} - {lesson.duration} minutos
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-6">
                        <ModuleForm onSubmit={handleAddModule} />
                        <LessonForm 
                            modules={course.modules || []} 
                            onSubmit={handleAddLesson}
                        />
                    </div>
                </div>

                <div className="border-t pt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        Excluir Curso
                    </button>
                </div>
            </div>

            <DeleteCourseModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteCourse}
                loading={loading}
            />
        </div>
    );
};