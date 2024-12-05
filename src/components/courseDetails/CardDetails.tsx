import { formatPrice } from "../../lib/utils"
import { Course } from "../../types/course"
import { Button } from "../ui/Button"

interface ICardDetails {
    course: Course
    isOwnCourse: boolean | null
    isEnrolled: boolean | null
    isCourseInCart: boolean | null
    handleButtonAction: () => void
  }
  
export const CardDetails = ({ course, isOwnCourse, isCourseInCart, isEnrolled, handleButtonAction}: ICardDetails) => {
  return (
    <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
            </div>
            <Button
              className="w-full mb-4"
              size="lg"
              onClick={handleButtonAction}
              disabled={isOwnCourse === true}
            >
              {isOwnCourse
                ? 'Seu próprio curso'
                : isEnrolled
                  ? 'Ir para o curso'
                  : isCourseInCart
                    ? 'Já está no carrinho'
                    : 'Adicionar ao Carrinho'}
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
  )
}
