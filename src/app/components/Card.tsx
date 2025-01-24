import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  description: ReactNode;
  tabId?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  textColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  tabId,
  actionButton,
  textColor = "text-white",
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>{title}</h3>
      <span className={`mb-4 ${textColor}`}>{description}</span>
      
      {tabId && (
        <Link href={`/${tabId}`} className="text-green-400 cursor-pointer">
          Go to {title}
        </Link>
      )}

      {actionButton && (
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
          onClick={actionButton.onClick}
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
};

export default Card;
