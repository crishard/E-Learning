import { Star } from "lucide-react"
import { formatPrice } from "../lib/utils"
import { Course } from "../types/course"
import { Button } from "./ui/Button"

interface ICourseCardContent {
    course: Course,
    isOwnCourse: boolean | null,
    isEnrolled: boolean,
    isCourseInCart: boolean,
    handleButtonAction: any,
}
const CourseCardContent = ({ course, isOwnCourse, isEnrolled, isCourseInCart, handleButtonAction }: ICourseCardContent) => {
    return (
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-1">{course.description}</p>
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
                        onClick={handleButtonAction}
                        disabled={isOwnCourse || isCourseInCart}
                    >
                        {isOwnCourse
                            ? 'Seu próprio curso'
                            : isEnrolled
                                ? 'Ir para o curso'
                                : isCourseInCart
                                    ? 'Já está no carrinho'
                                    : 'Adicionar ao Carrinho'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CourseCardContent