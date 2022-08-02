import { calcTotalPrice } from './calcTotalPrice';

export const getPortfolioFromLS = () => {
  const data = localStorage.getItem('portfolio');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
