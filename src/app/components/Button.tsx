import { ButtonProps } from "../types/buttonTypes";

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded text-white hover:opacity-90 transition-opacity ${className}`}
  >
    {label}
  </button>
);

export default Button;
