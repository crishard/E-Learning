import React from 'react';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <div className="text-center py-12 text-red-500">{message}</div>;
};
