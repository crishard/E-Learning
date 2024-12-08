import { Link } from "react-router-dom"
import { Course } from "../types/course"
import { CourseProgress } from "./CourseProgress"

interface IMyCoursesMap {
    courses: Course[]
}
export const MyCoursesMap = ({ courses }: IMyCoursesMap) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Meus Cursos</h1>
            <div className="grid gap-6">
                {courses.map((course) => (
                    <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start gap-4 p-4">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-48 h-32 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {course.description}
                                </p>
                                <CourseProgress course={course} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
