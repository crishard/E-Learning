export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    thumbnail: string;
    price: number;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    rating: number;
    totalRatings: number;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    duration: number;
    videoUrl: string;
    completed: boolean;
    materials?: Material[];
}

export interface Material {
    id: string;
    title: string;
    type: 'pdf' | 'link';
    url: string;
}