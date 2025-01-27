import React from 'react';

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        description: string;
        thumbnail: string;
    };
    onEdit: (courseId: string) => void;
    onDelete: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm max-w-[360px]">
            <h2 className="sm:text-lg text-base font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4 min-h-20">{course.description.substring(0, 100)}...</p>
            <div className='flex justify-center'>
                <img src={course.thumbnail} alt={course.title} className="w-[300px] h-40 object-cover mb-4 rounded lie" />
            </div>

            <div className="flex justify-between items-center">
                <button
                    onClick={() => onEdit(course.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(course.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};
