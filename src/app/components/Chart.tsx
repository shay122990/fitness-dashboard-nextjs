import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartProps } from '../types/chartTypes';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,Filler);

const Chart: React.FC<ChartProps> = ({ data, title, options }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h4 className="font-semibold">{title}</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
