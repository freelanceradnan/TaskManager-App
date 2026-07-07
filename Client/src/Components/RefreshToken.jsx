import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const RefreshToken = ({ setIsAuthenticate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsAuthenticate(true);
      
   
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/', { replace: true });
      }
    } else {
      setIsAuthenticate(false);
    }
  }, [location, navigate, setIsAuthenticate]);

  return null;
};
export default RefreshToken;