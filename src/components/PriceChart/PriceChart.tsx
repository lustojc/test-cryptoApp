import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface chartProps {
  name: string;
  coinPriceInterval: [];
  borderColor: string;
  backgroundColor: string;
  responsive: boolean;
  display: true | false;
  headerPostition?: 'top' | 'right' | 'bottom' | 'left';
}

export default function PriceChart({
  name,
  coinPriceInterval,
  borderColor = 'rgb(255, 99, 132)',
  backgroundColor = 'rgba(255, 99, 132, 0.5)',
  responsive = true,
  display = true,
  headerPostition = 'top',
}: chartProps) {
  const options = {
    responsive: responsive,
    plugins: {
      legend: {
        position: headerPostition,
      },
      title: {
        display: display,
        text: `${name} price chart!`,
      },
    },
  };

  const labels = coinPriceInterval?.map((el: { time: number }) =>
    new Date(el.time).toLocaleDateString('en-GB'),
  );

  const data = {
    labels,
    datasets: [
      {
        label: name,
        data: coinPriceInterval?.map((el: { priceUsd: string }) => el.priceUsd),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
