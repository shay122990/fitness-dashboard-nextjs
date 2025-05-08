import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  className?: string; 
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded  hover:opacity-90 transition-opacity ${className}`}
  >
    {label}
  </button>
);

export default Button;