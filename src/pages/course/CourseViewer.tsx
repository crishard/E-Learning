import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { LessonForum } from "../../components/forum/LessonForum";
import { LessonList } from "../../components/forum/LessonList";
import { VideoPlayer } from "../../components/VideoPlayer";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { Course, Module } from "../../types/course";

export const CourseViewer: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { user } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [showForum, setShowForum] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    let sanitizedCourseId = courseId?.startsWith(':') ? courseId.slice(1) : courseId;
    console.log("Sanitized Course ID:", sanitizedCourseId);
    const checkDocumentExists = async (docId: string | undefined) => {
        if(!docId) return;
        const docRef = doc(db, 'courses', docId);
        const docSnap = await getDoc(docRef);
        console.log(`Document ${docId} exists:`, docSnap.exists());
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("Document does not exist");
        }
        return docSnap;
    };
    useEffect(() => {
        const fetchCourse = async () => {
            console.log("Fetching course with ID:", courseId);
            if (!user) {
                console.error('User is not authenticated');
                setError('User is not authenticated');
                setLoading(false);
                return;
            }
            if (!courseId) {
                console.error('Course ID is missing');
                setError('Course ID is missing');
                setLoading(false);
                return;
            }

            console.log('Fetching course with ID:', courseId);

            try {
                console.log("Attempting to fetch document at path:", `courses/${sanitizedCourseId}`);
                await checkDocumentExists(sanitizedCourseId);
                const docSnap = await checkDocumentExists(sanitizedCourseId);
                
                console.log('Document snapshot:', docSnap);

                if (docSnap?.exists()) {
                    const courseData = docSnap.data();
                    console.log('Course data:', courseData);

                    
                    const modules: Module[] = courseData.modules || [{
                        title: 'Módulo Principal',
                        lessons: courseData.lessons || []
                    }];

                    setCourse({
                        id: docSnap.id,
                        ...courseData,
                        modules
                    } as Course);
                } else {
                    console.error('No such course document!');
                    setError('No such course document!');
                    toast.error('Curso não encontrado');
                }
            } catch (error) {
                console.error('Error fetching course:', error);
                setError('Error fetching course');
                toast.error('Erro ao carregar o curso');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [sanitizedCourseId, courseId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (error || !course || !user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        {error || 'Curso não encontrado'}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        O curso que você está procurando não existe ou você não tem acesso.
                    </p>
                </div>
            </div>
        );
    }

    const currentModule = course.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    const handleLessonSelect = (moduleIndex: number, lessonIndex: number) => {
        setCurrentModuleIndex(moduleIndex);
        setCurrentLessonIndex(lessonIndex);
        setShowForum(false);
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar with lessons */}
                <div className="w-80 bg-white h-screen overflow-y-auto border-r">
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-lg truncate">{course.title}</h2>
                    </div>
                    <LessonList
                        modules={course.modules}
                        currentModuleIndex={currentModuleIndex}
                        currentLessonIndex={currentLessonIndex}
                        onLessonSelect={handleLessonSelect}
                    />
                </div>

                {/* Main content area */}
                <div className="flex-1 h-screen overflow-y-auto">
                    <div className="p-6">
                        {currentLesson ? (
                            <>
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
                                    <p className="text-gray-600">
                                        Módulo: {currentModule.title} • {currentLesson.duration} minutos
                                    </p>
                                </div>

                                <div className="aspect-video mb-6">
                                    <VideoPlayer
                                        src={currentLesson.videoUrl}
                                        onProgress={(progress) => {
                                            console.log('Progress:', progress);
                                        }}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        onClick={() => setShowForum(!showForum)}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        {showForum ? 'Esconder Fórum' : 'Mostrar Fórum'}
                                    </button>

                                    <div className="flex gap-4">
                                        {currentLessonIndex > 0 && (
                                            <button
                                                onClick={() => handleLessonSelect(currentModuleIndex, currentLessonIndex - 1)}
                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                            >
                                                Aula Anterior
                                            </button>
                                        )}
                                        {currentLessonIndex < currentModule.lessons.length - 1 && (
                                            <button
                                                onClick={() => handleLessonSelect(currentModuleIndex, currentLessonIndex + 1)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Próxima Aula
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {showForum && (
                                    <div className="mt-8">
                                        <LessonForum courseId={courseId} lessonId={currentLesson.id} />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Selecione uma aula para começar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};