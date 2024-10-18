import React from 'react';

interface ButtonProps {
  className?: string;
  content: string;
  onClick?: () => void; // Making onClick optional
  type?: 'button' | 'submit' | 'reset'; // Allow different types of buttons
}

const Button: React.FC<ButtonProps> = ({ className, content, onClick, type = 'button' }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type} // Default type is 'button'
    >
      {content}
    </button>
  );
};

export default Button;
