import { InputBoxProps } from "../types/inputBoxTypes";

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        className="p-2 border rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputBox;
