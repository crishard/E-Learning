import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { Course } from '../types/course';

interface UseFetchCoursesResult {
    courses: Course[];
    categories: string[];
    course: Course | null;
    loading: boolean;
    error: string | null;
}

export const useFetchCourses = (courseId?: string): UseFetchCoursesResult => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                if (courseId) {
                    
                    const docRef = doc(db, 'courses', courseId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
                    } else {
                        setError('Curso não encontrado');
                    }
                } else {
                    const querySnapshot = await getDocs(collection(db, 'courses'));
                    const fetchedCourses: Course[] = [];
                    querySnapshot.forEach((doc) => {
                        fetchedCourses.push({ id: doc.id, ...doc.data() } as Course);
                    });
                    setCourses(fetchedCourses);

                    const uniqueCategories = Array.from(
                        new Set(fetchedCourses.map((course) => course.category))
                    );
                    setCategories(uniqueCategories);
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [courseId]);

    return { courses, categories, course, loading, error };
};
