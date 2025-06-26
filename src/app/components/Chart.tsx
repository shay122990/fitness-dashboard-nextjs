import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

interface ChartProps {
  data: ChartData<"line">;
  title: string;
  options?: ChartOptions<"line">;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart: React.FC<ChartProps> = ({ data, title, options }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
