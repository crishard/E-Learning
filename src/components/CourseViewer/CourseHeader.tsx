import React from 'react';

interface CourseHeaderProps {
  moduleTitle: string;
  lessonTitle: string;
  duration: number;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  moduleTitle,
  lessonTitle,
  duration,
}) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold mb-2">{lessonTitle}</h1>
    <p className="text-gray-600">
      Módulo: {moduleTitle} • {duration} minutos
    </p>
  </div>
);