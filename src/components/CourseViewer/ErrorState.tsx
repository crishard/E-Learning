import React from 'react';

interface ErrorStateProps {
  message?: string | null;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-700">
        {message || 'Course not found'}
      </h2>
      <p className="text-gray-500 mt-2">
        The course you're looking for doesn't exist or you don't have access.
      </p>
    </div>
  </div>
);