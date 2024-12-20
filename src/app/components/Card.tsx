import { CardProps } from "../types/cardTypes";

const Card: React.FC<CardProps> = ({ title, description, tabId, setActiveTab }) => {
  return (
    <div
      className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={() => setActiveTab(tabId)}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white mb-4">{description}</p>
      <span className="text-blue-500">Go to {title}</span>
    </div>
  );
};

export default Card;
