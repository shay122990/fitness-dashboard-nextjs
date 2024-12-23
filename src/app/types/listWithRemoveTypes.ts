export interface ListWithRemoveProps {
    title: string;
    items: string[];
    onRemove: (item: string) => void;
  }