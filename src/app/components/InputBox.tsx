interface InputBoxProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        className="p-2 border rounded bg-blue-900 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputBox;
