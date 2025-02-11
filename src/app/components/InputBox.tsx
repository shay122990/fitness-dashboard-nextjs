interface InputBoxProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <label className="text-white font-medium text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-3  rounded-lg bg-black bg-opacity-50 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 shadow-md"
      />
    </div>
  );
};

export default InputBox;