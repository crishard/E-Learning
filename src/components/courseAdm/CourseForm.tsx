import React from 'react';
import { Course } from '../../types/course';
import CourseFormContent from './CourseFormContent';

interface CourseFormProps {
    course: Course | null;
    onSubmit: (data: Partial<Course>) => Promise<void>;
    loading?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, loading }) => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const updateData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            price: parseFloat(formData.get('price') as string),
            category: formData.get('category') as string,
            level: formData.get('level') as Course['level'],
        };

        await onSubmit(updateData);
    };
    
    if (!course) return <p>Curso não encontrado</p>
    return <CourseFormContent course={course} handleSubmit={handleSubmit} loading={loading} />
};