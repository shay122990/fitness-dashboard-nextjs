import { CardProps } from "../types/cardTypes";
const Card: React.FC<CardProps> = ({ title, description, tabId, setActiveTab, actionButton }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white mb-4">{description}</p>
      {setActiveTab && (
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setActiveTab(tabId)}
        >
          Go to {title}
        </span>
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