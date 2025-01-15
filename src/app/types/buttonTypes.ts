export interface ButtonProps {
    label: string;
    onClick: () => void | Promise<void>;
    className?: string;
    isSignIn: boolean;
  }