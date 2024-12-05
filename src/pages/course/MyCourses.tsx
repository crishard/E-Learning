import React from 'react';
import { LoadingSpinner } from '../../components/courseAdm/LoadingSpinner';
import { MyCoursesMap } from '../../components/MyCoursesMap';
import { NotFoundCourses } from '../../components/NotFoundCourses';
import { useEnrolledCourses } from '../../hooks/useEnrolledCourses';

export const MyCourses: React.FC = () => {
    const { courses, loading } = useEnrolledCourses();

    if (loading) return <LoadingSpinner />

    if (!courses.length) return <NotFoundCourses />

    return <MyCoursesMap courses={courses} />
};