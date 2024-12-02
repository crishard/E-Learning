import { CheckCircle, ChevronDown, ChevronRight, Circle } from 'lucide-react';
import React from 'react';
import { Course } from '../../types/course';

interface LessonListProps {
  modules: Course['modules'];
  currentModuleIndex: number;
  currentLessonIndex: number;
  onLessonSelect: (moduleIndex: number, lessonIndex: number) => void;
}

export const LessonList: React.FC<LessonListProps> = ({
  modules,
  currentModuleIndex,
  currentLessonIndex,
  onLessonSelect,
}) => {
  const [expandedModules, setExpandedModules] = React.useState<boolean[]>(
    modules.map((_, index) => index === currentModuleIndex)
  );

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="py-4">
      {modules.map((module, moduleIndex) => (
        <div key={moduleIndex} className="mb-2">
          <button
            onClick={() => toggleModule(moduleIndex)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              {expandedModules[moduleIndex] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="font-medium">{module.title}</span>
            </div>
            <span className="text-sm text-gray-500">
              {module.lessons.length} aulas
            </span>
          </button>

          {expandedModules[moduleIndex] && (
            <div className="ml-4">
              {module.lessons.map((lesson, lessonIndex) => (
                <button
                  key={lessonIndex}
                  onClick={() => onLessonSelect(moduleIndex, lessonIndex)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 ${
                    moduleIndex === currentModuleIndex &&
                    lessonIndex === currentLessonIndex
                      ? 'bg-blue-50 text-blue-600'
                      : ''
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-gray-500">
                      {lesson.duration} minutos
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};