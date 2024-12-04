import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { Course } from '../types/course';

interface UseFetchCoursesResult {
    courses: Course[];
    categories: string[];
    loading: boolean;
    error: string | null;
}

export const useFetchCourses = (): UseFetchCoursesResult => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);

            try {
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
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return { courses, categories, loading, error };
};
