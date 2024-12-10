import React from 'react';

interface UserAvatarProps {
  photoURL?: string | null;
  displayName: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ photoURL, displayName }) => {
  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={displayName}
        className="w-10 h-10 rounded-full"
      />
    );
  }

  return (
    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
      {displayName[0]}
    </div>
  );
};