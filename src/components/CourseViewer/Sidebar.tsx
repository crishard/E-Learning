import React from 'react';
import { Module } from '../../types/course';
import { LessonList } from '../forum/LessonList';

interface SidebarProps {
  title: string;
  modules: Module[];
  currentModuleIndex: number;
  currentLessonIndex: number;
  onLessonSelect: (moduleIndex: number, lessonIndex: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  modules,
  currentModuleIndex,
  currentLessonIndex,
  onLessonSelect,
}) => (
  <div className="w-80 bg-white h-screen overflow-y-auto border-r">
    <div className="p-4 border-b">
      <h2 className="font-bold text-lg truncate">{title}</h2>
    </div>
    <LessonList
      modules={modules}
      currentModuleIndex={currentModuleIndex}
      currentLessonIndex={currentLessonIndex}
      onLessonSelect={onLessonSelect}
    />
  </div>
);