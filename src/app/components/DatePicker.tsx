import React from "react";

interface DatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <label htmlFor="date" className="font-semibold lg:text-xl uppercase">
        Select Date:
      </label>
      <input
        id="date"
        type="date"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1 border border-green-500 rounded-lg bg-black bg-opacity-50 text-white shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-950"
      />
    </div>
  );
};

export default DatePicker;
