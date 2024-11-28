import { Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import { Course } from '../types/curse';
import { Button } from './ui/Button';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addItem({
      courseId: course.id,
      title: course.title,
      price: course.price,
      thumbnail: course.thumbnail,
    });
  };

  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">{course.category}</span>
            <span className="text-sm text-gray-500">{course.level}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({course.totalRatings})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{formatPrice(course.price)}</span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};