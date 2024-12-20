import { ChartData, ChartOptions } from 'chart.js';

export interface ChartProps {
  data: ChartData<'line'>; 
  title: string; 
  options?: ChartOptions<'line'>; 
}
