import React from 'react';

interface NavigationControlsProps {
  currentLessonIndex: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  onToggleForum: () => void;
  showForum: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentLessonIndex,
  totalLessons,
  onPrevious,
  onNext,
  onToggleForum,
  showForum,
}) => (
  <div className="flex justify-between items-center mb-6">
    <button
      onClick={onToggleForum}
      className="text-blue-600 hover:text-blue-700 font-medium"
    >
      {showForum ? 'Esconder' : 'Mostrar'}
    </button>

    <div className="flex gap-4">
      {currentLessonIndex > 0 && (
        <button
          onClick={onPrevious}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Lição anterior
        </button>
      )}
      {currentLessonIndex < totalLessons - 1 && (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Próxima lição
        </button>
      )}
    </div>
  </div>
);