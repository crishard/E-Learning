import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { FEATURED_COURSES } from '../data/curses';

export const HomePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const categories = Array.from(
        new Set(FEATURED_COURSES.map((course) => course.category))
    );

    const filteredCourses = FEATURED_COURSES.filter((course) => {

        const matchesCategory = !selectedCategory || course.category === selectedCategory;
        return matchesCategory;
    });

    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Aprenda com os Melhores Cursos Online
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Explore nossa biblioteca de cursos de alta qualidade e comece sua jornada de aprendizado hoje.
                </p>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Todas as categorias</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>
        </div>
    );
};