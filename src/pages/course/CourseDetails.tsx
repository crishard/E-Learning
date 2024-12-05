import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/courseAdm/LoadingSpinner';
import { CourseDetailsComponent } from '../../components/courseDetails/CourseDetailsComponent';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../hooks/useCourse';
import { useHandleCourseAction } from '../../hooks/useHandleCourseAction';
import { useCartStore } from '../../store/cartStore';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isInCart } = useCartStore();
  const { user } = useAuth();
  const {course, loading, error, isEnrolled} = useCourse(courseId);
  const { handleButtonAction } = useHandleCourseAction();

 
  if (loading) return <LoadingSpinner />

  if (error || !course) {
    return <div className="text-center py-12">{error || 'Curso não encontrado'}</div>;
  }

  const isOwnCourse = user && course.userId === user.uid;
  const isCourseInCart = isInCart(course.id);

  return <CourseDetailsComponent course={course} isOwnCourse={isOwnCourse} isEnrolled={isEnrolled} isCourseInCart={isCourseInCart} handleButtonAction={() => handleButtonAction({ 
    course, 
    isEnrolled, 
    courseId 
  })}/>
};