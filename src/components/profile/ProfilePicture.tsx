import React from 'react';

interface ProfilePictureProps {
    photoURL: string | null;
    displayName: string;
    triggerFileInput: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
    photoURL,
    displayName,
    triggerFileInput,
    fileInputRef,
    handleImageUpload,
}) => {
    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {photoURL ? (
                <img
                    src={photoURL}
                    alt={displayName}
                    onClick={triggerFileInput}
                    className="w-20 h-20 rounded-full cursor-pointer object-cover"
                />
            ) : (
                <div
                    onClick={triggerFileInput}
                    className="w-20 h-20 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer"
                >
                    {displayName[0]}
                </div>
            )}
        </div>
    );
};
