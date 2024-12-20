export interface CardProps {
    title: string;
    description: string;
    tabId: string;
    setActiveTab: (tabId: string) => void;
  }
  