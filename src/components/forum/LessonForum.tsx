import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { ForumPost } from '../../types/forum';
import { ForumPostItem } from './ForumPostItem';
import { NewPostForm } from './NewPostForm';

interface LessonForumProps {
  courseId?: string;
  lessonId: string;
}

export const LessonForum: React.FC<LessonForumProps> = ({ courseId, lessonId }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'forum'),
      where('courseId', '==', courseId),
      where('lessonId', '==', lessonId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ForumPost[];
      setPosts(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId, lessonId]);

  const handleSubmitPost = async (content: string) => {
    if (!user || !content.trim()) return;

    try {
      await addDoc(collection(db, 'forum'), {
        courseId,
        lessonId,
        userId: user.uid,
        userDisplayName: user.displayName,
        userPhotoURL: user.photoURL,
        content,
        createdAt: serverTimestamp(),
        replies: [],
      });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Fórum da Aula</h3>
        <span className="text-gray-500">{posts.length} discussões</span>
      </div>
      
      <NewPostForm onSubmit={handleSubmitPost} />

      <div className="space-y-4">
        {posts.map((post) => (
          <ForumPostItem key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Seja o primeiro a iniciar uma discussão!
          </p>
        )}
      </div>
    </div>
  );
};