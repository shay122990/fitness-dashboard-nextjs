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
      className="px-3 py-2 border-gray-300 rounded-lg bg-black bg-opacity-50 text-white shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-950 hover:bg-blue-950"
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
