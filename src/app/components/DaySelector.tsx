interface DaySelectorProps {
  selectedDay: string;
  onChange: (day: string) => void;
  days: string[];
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onChange, days }) => (
  <div className="flex items-center gap-4">
    <label htmlFor="day" className="font-semibold text-lg">
      Select Day:
    </label>
    <select
      id="day"
      value={selectedDay}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg bg-blue-900 text-white shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-800"
    >
      {days.map((day) => (
        <option key={day} value={day} className="text-black">
          {day}
        </option>
      ))}
    </select>
  </div>
);

export default DaySelector;
