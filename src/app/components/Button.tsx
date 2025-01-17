import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  className?: string;
  isSignIn?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  isSignIn = false, 
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded text-white hover:opacity-90 transition-opacity ${
      isSignIn ? "bg-blue-500" : "bg-red-500"
    } ${className}`}
  >
    {label}
  </button>
);


export default Button;
