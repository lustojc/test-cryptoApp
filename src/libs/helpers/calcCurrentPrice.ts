import { item } from '../../store/slices/portfolioSlice';

interface allCoins {
  rank: string;
  priceUsd: string;
  name: string;
  id: string;
}

export const totalPorfolioPrice = (allCoins: allCoins[] = [], items: item[]) => {
  const coinsArr = [];
  for (let i = 0; i < items.length; i++) {
    const currentObj = allCoins?.find((obj) => obj.name === items[i].name);
    if (currentObj) {
      coinsArr.push({
        id: +currentObj.rank,
        title: currentObj.id,
        name: currentObj.name,
        count: items[i].count,
        price: +currentObj.priceUsd,
      });
    }
  }
  return coinsArr;
};
