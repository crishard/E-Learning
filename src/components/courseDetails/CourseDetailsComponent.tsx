import { Course } from "../../types/course"
import { VideoPlayer } from "../VideoPlayer"
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
    const firstLesson = course.modules[0]?.lessons[0];
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <VideoPlayer src={firstLesson?.videoUrl || "https://example.com/preview.mp4"} />

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
