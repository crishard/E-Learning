import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { Course } from '../types/course';

export const useEnrolledCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                setError(null);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Falha ao buscar cursos');
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [user?.enrolledCourses]);

    return { 
        courses, 
        loading, 
        error,
        totalEnrolledCourses: courses.length
    };
};