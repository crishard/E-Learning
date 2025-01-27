import React from 'react';
import { Course } from '../../types/course';
import CourseFormContent from './CourseFormContent';

interface CourseFormProps {
    course: Course | null;
    onSubmit: (data: Partial<Course>) => Promise<void>;
    loading?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, loading }) => {
    if (!course) return <p>Curso não encontrado</p>;
    
    return (
        <CourseFormContent 
            course={course} 
            onSubmit={onSubmit} 
            loading={loading} 
        />
    );
};