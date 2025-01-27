import { Course } from "../../types/course"
import { CardDetails } from "./CardDetails"
import { CourseInformation } from "./CourseInformation"
import { CourseModules } from "./CourseModules"

interface ICourseDetailsComponent {
    course: Course
    isOwnCourse: boolean | null
    isEnrolled: boolean | null
    isCourseInCart: boolean | null
    handleButtonAction: () => void
}


export const CourseDetailsComponent = ({ course, isOwnCourse, isCourseInCart, isEnrolled, handleButtonAction}: ICourseDetailsComponent) => {

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <img src={course.thumbnail} alt={course.title} />

                    <div className="mt-8">
                        <CourseInformation course={course} />
                        <CourseModules course={course} />
                    </div>
                </div>

                <CardDetails course={course} isOwnCourse={isOwnCourse} isEnrolled={isEnrolled} isCourseInCart={isCourseInCart} handleButtonAction={handleButtonAction} />
            </div>
        </div>
    )
}
