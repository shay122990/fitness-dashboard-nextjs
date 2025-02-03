
interface WeekSelectorProps {
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ selectedWeek, onSelectWeek }) => {
  return (
    <div className="week-selector">
      <label className="block text-lg font-bold mb-2">Select Week:</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4].map((week) => (
          <button
            key={week}
            className={`px-4 py-2 rounded-lg ${
              selectedWeek === week ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onSelectWeek(week)}
          >
            Week {week}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekSelector
