import React from 'react';
import { useForumActions } from '../../hooks/useForumActions';
import { useForumPosts } from '../../hooks/useForumPosts';
import { LoadingSpinner } from '../courseAdm/LoadingSpinner';
import { ForumHeader } from './ForumHeader';
import { ForumPostList } from './ForumPostList';
import { NewPostForm } from './NewPostForm';

interface LessonForumProps {
  courseId?: string;
  lessonId: string;
}

export const LessonForum: React.FC<LessonForumProps> = ({ courseId, lessonId }) => {
  const { posts, loading } = useForumPosts(courseId, lessonId);
  const { createPost, addReply } = useForumActions(courseId, lessonId);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <ForumHeader postCount={posts.length} />
      <NewPostForm onSubmit={createPost} />
      <ForumPostList posts={posts} onAddReply={addReply} />
    </div>
  );
};