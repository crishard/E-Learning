import React from 'react';

interface ReplyButtonProps {
  isReplying: boolean;
  onClick: () => void;
}

export const ReplyButton: React.FC<ReplyButtonProps> = ({ isReplying, onClick }) => (
  <button
    onClick={onClick}
    className="text-sm text-blue-600 hover:text-blue-700"
  >
    {isReplying ? 'Cancelar' : 'Responder'}
  </button>
);