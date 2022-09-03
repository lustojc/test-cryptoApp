import { item } from '../../store/slices/portfolioSlice';

interface allCoins {
  rank: string;
  priceUsd: string;
  name: string;
  id: string;
}

export const totalPorfolioPrice = (allCoins: allCoins[], items: item[]) => {
  const itemIds: number[] = items.map((el) => el.id);

  let coinsArr = [];
  for (let i = 0; i < itemIds.length; i++) {
    const a = allCoins?.find((obj) => +obj.rank === +itemIds[i]);
    let item = {};
    let count = [];
    for (let j = 0; j < items.length; j++) {
      const element = items[j];
      count.push(element.count);
    }
    if (a?.name != undefined) {
      item = {
        id: +a.rank,
        title: a.id,
        count: +count[i],
        price: +a.priceUsd,
        name: a.name,
      };
    } else {
      return coinsArr;
    }
    coinsArr.push(item);
  }

  return coinsArr;
};
