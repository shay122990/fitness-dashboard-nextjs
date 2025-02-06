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
      className={`border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col  justify-between ${className}`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>{title}</h3>
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
