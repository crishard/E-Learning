import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/courseAdm/LoadingSpinner';
import { CourseHeader } from '../../components/CourseViewer/CourseHeader';
import { ErrorState } from '../../components/CourseViewer/ErrorState';
import { NavigationControls } from '../../components/CourseViewer/NavigationControls';
import { Sidebar } from '../../components/CourseViewer/Sidebar';
import { LessonForum } from '../../components/forum/LessonForum';
import { VideoPlayer } from '../../components/VideoPlayer';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../hooks/useCourse';
import { useCurrentLesson } from '../../hooks/useCurrentLesson';

export const CourseViewer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const sanitizedCourseId = courseId?.startsWith(':') ? courseId.slice(1) : courseId;
  const { course, loading, error } = useCourse(sanitizedCourseId);
  const [showForum, setShowForum] = useState(false);
  
  const {
    currentModuleIndex,
    currentLessonIndex,
    currentModule,
    currentLesson,
    handleLessonSelect,
  } = useCurrentLesson(course?.modules || []);

  if (loading) return <LoadingSpinner />;
  if (error || !course || !user) return <ErrorState message={error} />;

  const handleNext = () => {
    handleLessonSelect(currentModuleIndex, currentLessonIndex + 1);
    setShowForum(false);
  };

  const handlePrevious = () => {
    handleLessonSelect(currentModuleIndex, currentLessonIndex - 1);
    setShowForum(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar
          title={course.title}
          modules={course.modules}
          currentModuleIndex={currentModuleIndex}
          currentLessonIndex={currentLessonIndex}
          onLessonSelect={handleLessonSelect}
        />

        <div className="flex-1 h-screen overflow-y-auto">
          <div className="p-6">
            {currentLesson ? (
              <>
                <CourseHeader
                  moduleTitle={currentModule?.title || ''}
                  lessonTitle={currentLesson.title}
                  duration={currentLesson.duration}
                />

                <div className="aspect-video mb-6">
                  <VideoPlayer src={currentLesson.videoUrl} />
                </div>

                <NavigationControls
                  currentLessonIndex={currentLessonIndex}
                  totalLessons={currentModule?.lessons.length || 0}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onToggleForum={() => setShowForum(!showForum)}
                  showForum={showForum}
                />

                {showForum && (
                  <div className="mt-8">
                    <LessonForum 
                      courseId={sanitizedCourseId} 
                      lessonId={currentLesson.id} 
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Selecione uma aula para começar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};