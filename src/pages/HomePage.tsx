import React, { useState } from 'react';
import { CourseList } from '../components/home/CourseList';
import { ErrorMessage } from '../components/home/ErrorMessage';
import { Loading } from '../components/home/Loading';
import { SearchBar } from '../components/home/SearchBar';
import { useFetchCourses } from '../hooks/useFetchCourses';

export const HomePage: React.FC = () => {
    const { courses, categories, loading, error } = useFetchCourses();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

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

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            <CourseList courses={filteredCourses} />
        </div>
    );
};
