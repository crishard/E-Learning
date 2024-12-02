import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const LocationLogger: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current path:', location.pathname);
  }, [location]);

  return null;
};

