export type UserRole = 'student' | 'instructor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  bio?: string;
  createdAt: Date;
  enrolledCourses?: string[];
}