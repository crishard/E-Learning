import React from 'react';
import { calculateProgress } from '../lib/utils';
import { Course } from '../types/course';

interface CourseProgressProps {
  course: Course;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ course }) => {
  const progress = calculateProgress(course);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length,
    0
  );
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="font-semibold mb-2">{course.title}</h3>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
      <span>{completedLessons} de {totalLessons} Aulas</span>
      <span>{progress}% concluído</span>
      </div>
    </div>
  );
};