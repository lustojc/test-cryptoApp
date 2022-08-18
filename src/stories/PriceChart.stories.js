import PriceChart from '../components/PriceChart/PriceChart';

export default {
  title: 'PriceChart',
  component: PriceChart,
};

const Template = (args) => <PriceChart {...args} />;

export const Primary = Template.bind({});

const testData = [
  {
    priceUsd: '23394.7064128563037142',
    time: 1659528000000,
    circulatingSupply: '19111162',
    date: '2022-08-03',
  },
  {
    priceUsd: '23440.7597059513325438',
    time: 1659546000000,
    circulatingSupply: '19111325',
    date: '2022-08-03',
  },
  {
    priceUsd: '23096.1123770103973956',
    time: 1659589200000,
    circulatingSupply: '19111706',
    date: '2022-08-04',
  },
];

Primary.args = {
  name: 'Primary',
  borderColor: 'black',
  backgroundColor: 'red',
  responsive: true,
  display: true,
  headerPostition: 'top',
  coinPriceInterval: testData,
};

export const Secondary = Template.bind({});

Secondary.args = {
  name: 'Secondary',
  borderColor: 'black',
  backgroundColor: 'red',
  responsive: false,
  display: false,
  headerPostition: 'bottom',
  coinPriceInterval: testData,
};
