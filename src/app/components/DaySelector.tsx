interface DaySelectorProps {
  selectedDay: string;
  onChange: (day: string) => void;
  days: string[];
}

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDay,
  onChange,
  days,
}) => (
  <div className="flex items-center justify-between mb-6">
    <label htmlFor="day" className="font-semibold lg:text-xl uppercase">
      Select Day:
    </label>
    <select
      id="day"
      value={selectedDay}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1 border border-green-500 rounded-lg bg-blue-700
                 "
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
