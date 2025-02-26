import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  description: React.ReactNode;
  tabId?: string;
  textColor?: string;
  children?: React.ReactNode; 
  className?: string;  
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  tabId,
  textColor = "text-white",
  children, 
  className,
}) => {
  return (
    <div
      className={`bg-black bg-opacity-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col min-h-[100px] ${className}`}
    >
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>{title}</h2>
      <span className={`mb-4 ${textColor}`}>{description}</span>

      {tabId && (
        <Link href={`/${tabId}`} className="text-green-400 cursor-pointer">
          Go to {title}
        </Link>
      )}
      {children} 
    </div>
  );
};

export default Card;
