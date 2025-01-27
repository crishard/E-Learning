import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { useAuthStore } from "../store/authStore";
import { Course } from "../types/course";

export const useCreateCourseForm = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const [formData, setFormData] = useState<Omit<Course, 'id' | 'instructor' | 'rating' | 'totalRatings' | 'modules' | 'duration' | 'userId'>>({
        title: '',
        description: '',
        price: 0,
        category: '',
        level: 'beginner',
        thumbnail: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            const courseData: Omit<Course, 'id'> = {
                ...formData,
                userId: user.uid,
                instructor: user.displayName || '',
                rating: 0,
                totalRatings: 0,
                modules: [],
                duration: 0,
            };

            const docRef = await addDoc(collection(db, 'courses'), courseData);
            navigate(`/editar-curso/${docRef.id}`);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
    };
};
