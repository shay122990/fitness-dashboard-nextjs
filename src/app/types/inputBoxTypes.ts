export interface InputBoxProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "number";
  }
  