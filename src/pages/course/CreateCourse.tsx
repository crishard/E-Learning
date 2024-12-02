import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { useAuthStore } from '../../store/authStore';
import { Course } from '../../types/course';

export const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Omit<Course, 'id' | 'instructor' | 'rating' | 'totalRatings' | 'modules' | 'duration' | 'userId'>>({
    title: '',
    description: '',
    price: 0,
    category: '',
    level: 'beginner',
    thumbnail: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          thumbnail: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const courseData: Omit<Course, 'id'> = {
        ...formData,
        userId: user.uid,
        instructor: user.displayName || '',
        rating: 0,
        totalRatings: 0,
        modules: [],
        duration: 0,
      };

      const docRef = await addDoc(collection(db, 'courses'), courseData);
      navigate(`/course/${docRef.id}`);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user || user.role !== 'instructor') {
    return <p>Acesso não autorizado</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Curso</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Imagem de Capa
          </label>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.thumbnail ? (
            <img 
              src={formData.thumbnail} 
              alt="Course thumbnail" 
              className="mt-2 max-w-full h-auto cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            />
          ) : (
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Carregar Imagem
            </button>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título do Curso
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Preço
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Nível
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="beginner">Iniciante</option>
            <option value="intermediate">Intermediário</option>
            <option value="advanced">Avançado</option>
          </select>
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Criar Curso
        </button>
      </form>
    </div>
  );
};

