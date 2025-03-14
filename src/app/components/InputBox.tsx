interface InputBoxProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1 w-full ">
      <label className="text-green-400 font-medium text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 mb-2 lg:p-3 rounded-lg bg-blue-950 bg-opacity-50 text-white placeholder:text-white  ease-in-out transform  shadow-md"
      />
    </div>
  );
};

export default InputBox;