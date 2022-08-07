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

interface chartProps {
  name: string;
  coinPriceInterval: [];
}

export default function PriceChart({ name, coinPriceInterval }: chartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${name} price chart!`,
      },
    },
  };

  const labels = coinPriceInterval.map((el: { time: number }) =>
    new Date(el.time).toLocaleDateString('en-GB'),
  );

  const data = {
    labels,
    datasets: [
      {
        label: name,
        data: coinPriceInterval.map((el: { priceUsd: string }) => el.priceUsd),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
