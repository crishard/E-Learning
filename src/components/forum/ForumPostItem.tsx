import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState } from 'react';
import { ForumPost } from '../../types/forum';
import { RepliesList } from './RepliesList';
import { ReplyButton } from './ReplyButton';
import { ReplyForm } from './ReplyForm';
import { UserAvatar } from './UserAvatar';

interface ForumPostItemProps {
  post: ForumPost;
  onAddReply: (postId: string, content: string) => Promise<void>;
}

export const ForumPostItem: React.FC<ForumPostItemProps> = ({ post, onAddReply }) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = async (content: string) => {
    await onAddReply(post.id, content);
    setIsReplying(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-start gap-3">
        <UserAvatar photoURL={post.userPhotoURL} displayName={post.userDisplayName} />
        <div className="flex-1">
        <div className="flex items-center gap-2">
            <span className="font-medium">{post.userDisplayName}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(post.createdAt, { locale: ptBR, addSuffix: true })}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
          
          <div className="mt-4">
            <ReplyButton isReplying={isReplying} onClick={() => setIsReplying(!isReplying)} />
          </div>

          {isReplying && (
            <div className="mt-4">
              <ReplyForm onSubmit={handleReply} />
            </div>
          )}

          <RepliesList replies={post.replies} />
        </div>
      </div>
    </div>
  );
};