import { DaySelectorProps } from "../types/daySelectorTypes";

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onChange, days }) => (
  <div className="day-selector">
    <label htmlFor="day" className="font-semibold">Select Day:</label>
    <select
      id="day"
      value={selectedDay}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded bg-gray-800 text-white"
    >
      {days.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  </div>
);

export default DaySelector;
