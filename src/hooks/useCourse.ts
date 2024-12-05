import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { Course, Module } from '../types/course';

export const useCourse = (courseId: string | undefined) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setError('Course ID is missing');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = docSnap.data();
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
          setError('Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Error loading course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return { course, loading, error };
};