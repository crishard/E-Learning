import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Course } from '../types/course';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
}

export const calculateProgress = (course: Course): number => {
    let totalLessons = 0;
    let completedLessons = 0;
  
    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
      completedLessons += module.lessons.filter(lesson => lesson.completed).length;
    });
  
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons / totalLessons) * 100);
  };