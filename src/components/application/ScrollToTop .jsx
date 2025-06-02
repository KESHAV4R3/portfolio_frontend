// hooks/useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Attempt regular scroll
    window.scrollTo(0, 0);
    
    // Fallback for browsers that might not respect the above
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // Nuclear option for stubborn cases
    const timer = setInterval(() => {
      if (window.pageYOffset === 0) clearInterval(timer);
      window.scrollTo(0, 0);
    }, 10);
    
    return () => clearInterval(timer);
  }, [pathname]);
};