import { useState } from 'react';
import { Lesson, Module } from '../types/course';

interface UseCurrentLessonResult {
  currentModuleIndex: number;
  currentLessonIndex: number;
  currentModule: Module | undefined;
  currentLesson: Lesson; 
  handleLessonSelect: (moduleIndex: number, lessonIndex: number) => void;
}

export const useCurrentLesson = (modules: Module[]): UseCurrentLessonResult => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const currentModule = modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  const handleLessonSelect = (moduleIndex: number, lessonIndex: number) => {
    setCurrentModuleIndex(moduleIndex);
    setCurrentLessonIndex(lessonIndex);
  };

  return {
    currentModuleIndex,
    currentLessonIndex,
    currentModule,
    currentLesson,
    handleLessonSelect,
  };
};