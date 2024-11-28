import { Award, Clock, Star, Users } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoPlayer } from '../../components/VideoPlayer';
import { Button } from '../../components/ui/Button';
import { FEATURED_COURSES } from '../../data/curses';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  
  const course = FEATURED_COURSES.find((c) => c.id === courseId);

  if (!course) {
    return <div className="text-center py-12">Curso não encontrado</div>;
  }

  const handleAddToCart = () => {
    addItem({
      courseId: course.id,
      title: course.title,
      price: course.price,
      thumbnail: course.thumbnail,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer src="https://example.com/preview.mp4" />
          
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
                {course.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{lesson.title}</span>
                  </li>
                ))}
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
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
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