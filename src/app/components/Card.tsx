import { ReactNode } from "react";

interface CardProps {
  title: string;
  description: ReactNode;
  tabId: string;
  setActiveTab?: (tabId: string) => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}
const Card: React.FC<CardProps> = ({ title, description, tabId, setActiveTab, actionButton }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <span className="text-black mb-4">{description}</span>
      {setActiveTab && (
        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => setActiveTab(tabId)}
        >
          Go to {title}
        </button>
      )}
      {actionButton && (
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-black rounded hover:bg-red-400"
          onClick={actionButton.onClick}
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
};

export default Card;