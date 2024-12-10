export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  userId: string;
  instructor: string;
  thumbnail: string;
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  rating: number;
  totalRatings: number;
  numberOfStudents?: number;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration: number;
  videoUrl: string;
  completed: boolean;
}

