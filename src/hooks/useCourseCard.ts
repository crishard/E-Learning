import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Course } from '../types/course';

export const useCourseCard = (course: Course) => {
  const { addItem, isInCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      if (user && user.enrolledCourses) {
        setIsEnrolled(user.enrolledCourses.includes(course.id));
      }
    };
    fetchEnrollmentStatus();
  }, [course.id, user]);

  const handleButtonAction = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isEnrolled) {
      navigate(`/course/${course.id}/learn`);
    } else {
      if (course && user) {
        if (course.userId === user.uid) {
          toast.error('Você não pode adicionar seu próprio curso ao carrinho.');
          return;
        }

        if (isInCart(course.id)) {
          toast.error('Este curso já está no seu carrinho.');
          return;
        }

        addItem({
          courseId: course.id,
          title: course.title,
          price: course.price,
          thumbnail: course.thumbnail,
        });
        toast.success('Curso adicionado ao carrinho com sucesso!');
      }
    }
  };

  const isOwnCourse = user && course.userId === user.uid;
  const isCourseInCart = isInCart(course.id);

  return {
    isEnrolled,
    isOwnCourse,
    isCourseInCart,
    handleButtonAction,
  };
};
