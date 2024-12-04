import { doc, updateDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { db } from '../lib/firebase';

export const useImageUpload = (user: any, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result as string;
                try {
                    await updateDoc(doc(db, 'users', user.uid), {
                        photoURL: base64Image,
                    });
                    setFormData((prev: any) => ({ ...prev, photoURL: base64Image }));
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return {
        handleImageUpload,
        triggerFileInput,
        fileInputRef,
    };
};
