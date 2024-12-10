import React from 'react';
import { ForumPost } from '../../types/forum';
import { ForumEmptyState } from './ForumEmptyState';
import { ForumPostItem } from './ForumPostItem';

interface ForumPostListProps {
  posts: ForumPost[];
  onAddReply: (postId: string, content: string) => Promise<void>;
}

export const ForumPostList: React.FC<ForumPostListProps> = ({ posts, onAddReply }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <ForumPostItem 
        key={post.id} 
        post={post}
        onAddReply={onAddReply}
      />
    ))}

    {posts.length === 0 && <ForumEmptyState />}
  </div>
);