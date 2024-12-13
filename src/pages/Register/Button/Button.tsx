import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset'; 
  color?: string; 
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  color = '#050708',
  textColor = 'white',
  size = 'md',
  className = '',
  disabled = false,  // default is false
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-${textColor} ${disabled?`bg-gray-500`:`bg-[${color}]`} hover:bg-[${color}]/80 focus:ring-4 focus:outline-none focus:ring-[${color}]/50 font-medium rounded-lg ${sizeClasses[size]} text-center inline-flex items-center dark:hover:bg-[${color}]/40 dark:focus:ring-gray-600 ${className}`}
      disabled ={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
