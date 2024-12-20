import { ChartData } from 'chart.js';

export interface ChartProps {
  data: ChartData<'line'>;
  title: string;
}
