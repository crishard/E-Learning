import React from 'react';

interface ForumHeaderProps {
  postCount: number;
}

export const ForumHeader: React.FC<ForumHeaderProps> = ({ postCount }) => (
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-semibold">Fórum da aula</h3>
    <span className="text-gray-500">{postCount} discussões</span>
  </div>
);