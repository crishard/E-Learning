import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseCard } from '../hooks/useCourseCard';
import { Course } from '../types/course';
import CourseCardContent from './CourseCardContent';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { isEnrolled, isOwnCourse, isCourseInCart, handleButtonAction } = useCourseCard(course);

  return (
    <Link
      to={`/course/${course.id}`}
      className="block"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button')) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <CourseCardContent
        course={course}
        isOwnCourse={isOwnCourse}
        isEnrolled={isEnrolled}
        isCourseInCart={isCourseInCart}
        handleButtonAction={handleButtonAction}
      />
    </Link>
  );
};
