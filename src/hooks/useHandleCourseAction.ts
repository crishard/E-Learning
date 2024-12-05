import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
import { Course } from '../types/course';

interface UseHandleCourseActionParams {
  course?: Course | null;
  isEnrolled: boolean;
  courseId?: string;
}

export const useHandleCourseAction = () => {
  const { addItem, isInCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleButtonAction = ({
    course, 
    isEnrolled, 
    courseId 
  }: UseHandleCourseActionParams) => {
    
    if (isEnrolled) {
      navigate(`/course/${courseId}/learn`);
      return;
    }

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
  };

  return { handleButtonAction };
};