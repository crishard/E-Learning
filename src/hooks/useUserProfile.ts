import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { UserProfile } from '../types/user';

export const useUserProfile = (user: UserProfile | null) => {
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        bio: user?.bio || '',
        photoURL: user?.photoURL || '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const updateProfile = async () => {
        if (!user) return;

        try {
            await updateDoc(doc(db, 'users', user.uid), {
                displayName: formData.displayName,
                bio: formData.bio,
            });

            if (user) {
                user.displayName = formData.displayName;
                user.bio = formData.bio;
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return {
        formData,
        setFormData,
        isEditing,
        setIsEditing,
        updateProfile,
    };
};
