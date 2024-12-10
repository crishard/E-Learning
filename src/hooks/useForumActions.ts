import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';

export const useForumActions = (courseId?: string, lessonId?: string) => {
  const { user } = useAuth();

  const createPost = async (content: string) => {
    if (!user || !content.trim() || !courseId) return;

    try {
      const postData = {
        courseId,
        lessonId,
        userId: user.uid,
        userDisplayName: user.displayName || 'Anonymous',
        userPhotoURL: user.photoURL || null,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        replies: []
      };

      await addDoc(collection(db, 'forum'), postData);
      toast.success('Post created successfully');
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Failed to create post');
    }
  };

  const addReply = async (postId: string, content: string) => {
    if (!user || !content.trim()) return;

    try {
      const replyData = {
        id: crypto.randomUUID(),
        postId,
        userId: user.uid,
        userDisplayName: user.displayName || 'Anonymous',
        userPhotoURL: user.photoURL || null,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const postRef = doc(db, 'forum', postId);
      await updateDoc(postRef, {
        replies: arrayUnion(replyData),
        updatedAt: serverTimestamp()
      });
      toast.success('Reply added successfully');
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Failed to add reply');
    }
  };

  return {
    createPost,
    addReply
  };
};