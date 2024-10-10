import React from 'react';

interface ButtonProps {
  className?: string;
  content: string;
}


const Button: React.FC<ButtonProps> = ({ className, content }) => {
  return <button className={className}>{content}</button>;
};

export default Button;
