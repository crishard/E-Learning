import React, { useState } from 'react';
import { Course } from '../../types/course';
import { LessonFormContent } from './LessonFormContent';

interface LessonFormProps {
    modules: Course['modules'];
    onSubmit: (data: {
        title: string;
        duration: number;
        videoUrl: string;
        moduleIndex: number;
    }) => Promise<void>;
}

export const LessonForm: React.FC<LessonFormProps> = ({ modules, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        duration: 0,
        videoUrl: '',
        moduleIndex: 0
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.videoUrl.trim()) return;

        setLoading(true);
        try {
            await onSubmit({
                title: formData.title.trim(),
                duration: Number(formData.duration),
                videoUrl: formData.videoUrl.trim(),
                moduleIndex: Number(formData.moduleIndex)
            });
            
            
            setFormData({
                title: '',
                duration: 0,
                videoUrl: '',
                moduleIndex: 0
            });
        } catch (error) {
            console.error('Error adding lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'moduleIndex' || name === 'duration' ? Number(value) : value
        }));
    };

    if (!modules.length) {
        return <p className="text-gray-500">Adicione um módulo antes de criar aulas.</p>;
    }

    return (
        <LessonFormContent 
            loading={loading} 
            formData={formData} 
            handleSubmit={handleSubmit} 
            handleChange={handleChange} 
            modules={modules} 
        />
    );
};