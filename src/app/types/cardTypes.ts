import { ReactNode } from "react";

export interface CardProps {
  title: string;
  description: ReactNode;
  tabId: string;
  setActiveTab?: (tabId: string) => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}