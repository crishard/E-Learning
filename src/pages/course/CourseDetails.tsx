import { doc, getDoc } from 'firebase/firestore';
import { Award, Clock, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoPlayer } from '../../components/VideoPlayer';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { Course } from '../../types/course';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { addItem, isInCart } = useCartStore();
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        const docRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
          if (user && user.enrolledCourses) {
            setIsEnrolled(user.enrolledCourses.includes(courseId));
          }
        } else {
          setError('Curso não encontrado');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Erro ao carregar o curso. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, user]);

  const handleButtonAction = () => {
    if (isEnrolled) {
      
      navigate(`/course/:${courseId}/learn`);
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


  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (error || !course) {
    return <div className="text-center py-12">{error || 'Curso não encontrado'}</div>;
  }

  const isOwnCourse = user && course.userId === user.uid;
  const isCourseInCart = isInCart(course.id);

  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer src={firstLesson?.videoUrl || "https://example.com/preview.mp4"} />

          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{course.duration}h de conteúdo</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>{course.totalRatings} alunos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">O que você vai aprender</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.modules.flatMap(module =>
                  module.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{lesson.title}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
            </div>
            <Button
              className="w-full mb-4"
              size="lg"
              onClick={handleButtonAction}
              disabled={isOwnCourse === true} 
            >
              {isOwnCourse
                ? 'Seu próprio curso'
                : isEnrolled
                  ? 'Ir para o curso'
                  : isCourseInCart
                    ? 'Já está no carrinho'
                    : 'Adicionar ao Carrinho'}
            </Button>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>Acesso vitalício ao curso</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>Certificado de conclusão</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                <span>Suporte do instrutor</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};