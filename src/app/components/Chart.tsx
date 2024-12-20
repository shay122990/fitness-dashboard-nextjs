import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';


interface ChartProps {
  data: ChartData<'line'>;
  title: string;
}

const Chart: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h4 className="font-semibold">{title}</h4>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default Chart;
