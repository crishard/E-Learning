import React from 'react';
import { EditProfileForm } from './EditProfileForm';

interface EditProfileFormProps {
    formData: {
        displayName: string;
        bio: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        displayName: string;
        bio: string;
        photoURL: string;
    }>>
    updateProfile: () => void;
    cancelEdit: () => void;
}

export const EditProfile: React.FC<EditProfileFormProps> = ({
    formData,
    setFormData,
    updateProfile,
    cancelEdit,
}) => {
    return <EditProfileForm formData={formData} setFormData={setFormData} updateProfile={updateProfile} cancelEdit={cancelEdit}/>
};
