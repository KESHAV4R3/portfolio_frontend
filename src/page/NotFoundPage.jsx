import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {/* Animated 404 text */}
      <div className="mb-8 text-center">
        <h1 className="text-9xl font-bold text-red-500 dark:text-red-400 mb-2">
          <span className="inline-block animate-bounce">4</span>
          <span className="inline-block animate-pulse">0</span>
          <span className="inline-block animate-bounce">4</span>
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Page Not Found</h2>
      </div>

      {/* Message */}
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Animated home button */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go Back Home
      </Link>

      {/* Simple floating graphic (pure CSS) */}
      <div className="mt-16 w-24 h-24 relative">
        <div className="absolute inset-0 animate-float">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;