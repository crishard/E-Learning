import { Award, Clock, Star, Users } from "lucide-react"
import { Course } from "../../types/course"

interface ICourseInformation {
  course: Course
}

export const CourseInformation = ({ course }: ICourseInformation) => {
  return (
    <div>
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
    </div>
  )
}
