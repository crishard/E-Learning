import React from 'react';
import { EditProfileForm } from '../../components/profile/EditProfileForm';
import { PersonalInformation } from '../../components/profile/PersonalInformation';
import { ProfileActions } from '../../components/profile/ProfileActions';
import { ProfilePicture } from '../../components/profile/ProfilePicture';
import { useAuth } from '../../context/AuthContext';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useUserProfile } from '../../hooks/useUserProfile';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const { formData, setFormData, isEditing, setIsEditing, updateProfile } = useUserProfile(user);
    const { handleImageUpload, triggerFileInput, fileInputRef } = useImageUpload(user, setFormData);

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto sm:p-6 p-2">
            <div className="bg-white rounded-lg shadow-md sm:p-6 p-4">
                <div className="flex items-center gap-4 mb-6">
                    <ProfilePicture
                        photoURL={formData.photoURL}
                        displayName={user.displayName}
                        triggerFileInput={triggerFileInput}
                        fileInputRef={fileInputRef}
                        handleImageUpload={handleImageUpload}
                    />
                    <PersonalInformation name={user.displayName} email={user.email} role={user.role} />
                </div>

                {isEditing ? (
                    <EditProfileForm
                        formData={formData}
                        setFormData={setFormData}
                        updateProfile={updateProfile}
                        cancelEdit={() => setIsEditing(false)}
                    />
                ) : (
                    <ProfileActions
                        bio={user.bio}
                        role={user.role}
                        onEdit={() => setIsEditing(true)}
                    />
                )}
            </div>
        </div>
    );
};
