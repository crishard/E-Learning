import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import { ForumPost } from '../../types/forum';

interface ForumPostItemProps {
  post: ForumPost;
}

export const ForumPostItem: React.FC<ForumPostItemProps> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-start gap-3">
        {post.userPhotoURL ? (
          <img
            src={post.userPhotoURL}
            alt={post.userDisplayName}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {post.userDisplayName[0]}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.userDisplayName}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(post.createdAt, { locale: ptBR, addSuffix: true })}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
        </div>
      </div>
    </div>
  );
};