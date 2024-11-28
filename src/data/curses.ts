import { Course } from '../types/curse';

export const FEATURED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Desenvolvimento Web Completo',
    description: 'Aprenda HTML, CSS, JavaScript e React do zero ao avançado',
    instructor: 'João Silva',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    price: 299.90,
    category: 'Programação',
    level: 'beginner',
    duration: 40,
    rating: 4.8,
    totalRatings: 1250,
    lessons: [
      {
        id: '1-1',
        title: 'Introdução ao HTML5',
        duration: 45,
        videoUrl: 'https://example.com/lesson1.mp4',
        completed: false
      },
      {
        id: '1-2',
        title: 'CSS3 Fundamentos',
        duration: 60,
        videoUrl: 'https://example.com/lesson2.mp4',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Design UI/UX Masterclass',
    description: 'Domine as principais ferramentas e conceitos de design de interfaces',
    instructor: 'Maria Santos',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    price: 349.90,
    category: 'Design',
    level: 'intermediate',
    duration: 35,
    rating: 4.9,
    totalRatings: 980,
    lessons: [
      {
        id: '2-1',
        title: 'Fundamentos do Design UI',
        duration: 55,
        videoUrl: 'https://example.com/lesson3.mp4',
        completed: false
      },
      {
        id: '2-2',
        title: 'Prototipagem com Figma',
        duration: 65,
        videoUrl: 'https://example.com/lesson4.mp4',
        completed: false
      }
    ]
  }
];