import { ListWithRemoveProps } from "../types/listWithRemoveTypes";

const ListWithRemove: React.FC<ListWithRemoveProps> = ({ title, items, onRemove }) => (
  <div className="mt-6 border p-4">
    <h4 className="text-lg font-bold">{title}</h4>
    {items.length > 0 ? (
      <ul className="list-disc list-inside mt-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{item}</span>
            <button
              onClick={() => onRemove(item)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No items logged.</p>
    )}
  </div>
);

export default ListWithRemove;
