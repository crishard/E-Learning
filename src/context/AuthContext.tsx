import {
  signOut as firebaseSignOut,
  User as FirebaseUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { UserProfile } from '../types/user';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateEnrolledCourses: (newCourses: string[]) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setZustandUser, setLoading: setZustandLoading } = useAuthStore();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser);
        setUser(userProfile);
        setZustandUser(userProfile);
      } else {
        setUser(null);
        setZustandUser(null);
      }
      setLoading(false);
      setZustandLoading(false);
    });

    return () => unsubscribe();
  }, [setZustandUser, setZustandLoading]);

  const getUserProfile = async (firebaseUser: FirebaseUser): Promise<UserProfile> => {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (userDoc.exists()) {
      const existingUserData = userDoc.data() as UserProfile;


      if (!existingUserData.role) {
        existingUserData.role = 'student';
        await updateDoc(doc(db, 'users', firebaseUser.uid), { role: 'student' });
      }

      return existingUserData;
    }

    const newUser: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || 'Usuário',
      photoURL: firebaseUser.photoURL || undefined,
      role: 'student',
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    return newUser;
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userProfile = await getUserProfile(result.user);
      setUser(userProfile);
      useAuthStore.getState().setUser(userProfile);
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const updateEnrolledCourses = async (newCourses: string[]) => {
    if (user) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...(user.enrolledCourses || []), ...newCourses]
      };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateEnrolledCourses, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};