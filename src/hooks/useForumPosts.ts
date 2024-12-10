import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { ForumPost } from '../types/forum';

export const useForumPosts = (courseId: string | undefined, lessonId: string) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !lessonId) return;

    const q = query(
      collection(db, 'forum'),
      where('courseId', '==', courseId),
      where('lessonId', '==', lessonId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate(),
          replies: (data.replies || []).map((reply: any) => ({
            ...reply,
            createdAt: new Date(reply.createdAt),
            updatedAt: reply.updatedAt ? new Date(reply.updatedAt) : undefined
          }))
        } as ForumPost;
      });

      posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setPosts(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [courseId, lessonId]);

  return { posts, loading };
};