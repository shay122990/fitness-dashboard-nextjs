import { StatCardProps } from "../types/statCardTypes";

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="border p-4 rounded-lg">
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;