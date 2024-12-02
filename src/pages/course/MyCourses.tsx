import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CourseProgress } from '../../components/CourseProgress';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { Course } from '../../types/course';

export const MyCourses: React.FC = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user?.enrolledCourses?.length) {
                setLoading(false);
                return;
            }

            try {
                const coursesRef = collection(db, 'courses');

                const allCoursesSnapshot = await getDocs(coursesRef);
                const allCourses = allCoursesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Course));

                const fetchedCourses = allCourses.filter(course =>
                    user.enrolledCourses?.includes(course.id)
                );
                setCourses(fetchedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [user?.enrolledCourses]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (!courses.length) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Nenhum curso matriculado</h2>
                <p className="text-gray-600 mb-6">
                    Você ainda não está matriculado em nenhum curso.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Explorar Cursos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Meus Cursos</h1>
            <div className="grid gap-6">
                {courses.map((course) => (
                    <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start gap-4 p-4">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-48 h-32 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {course.description}
                                </p>
                                <CourseProgress course={course} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};