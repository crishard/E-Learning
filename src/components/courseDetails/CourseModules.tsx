import { Course } from "../../types/course"

interface ICourseModules {
    course: Course
}
export const CourseModules = ({ course }: ICourseModules) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Módulos do Curso</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    course.modules.map((module, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span>{module.title}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
