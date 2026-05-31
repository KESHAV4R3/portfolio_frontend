import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, to, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg text-sm transition-all duration-300 outline-none focus:ring-1 focus:ring-zinc-500 cursor-pointer';
  
  const variants = {
    primary: 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98] px-5 py-2.5 shadow-[0_4px_12px_rgba(255,255,255,0.1)]',
    secondary: 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-[0.98] px-5 py-2.5',
    text: 'text-zinc-400 hover:text-white hover:bg-zinc-900/50 px-4 py-2.5',
    outline: 'border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white active:scale-[0.98] px-5 py-2.5'
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:') || to.endsWith('.pdf')) {
      return (
        <a href={to} target="_blank" rel="noopener noreferrer" className={combinedStyles} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
