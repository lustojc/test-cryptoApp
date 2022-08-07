import { item } from './../redux/slices/portfolioSlice';

interface allCoins {
  rank: string;
  priceUsd: string;
  name: string;
}

export const totalPorfolioPrice = (allCoins: allCoins[], items: item[]) => {
  const itemIds: number[] = items.map((el) => el.id);

  let coinsArr = [];
  for (let i = 0; i < itemIds.length; i++) {
    const a = allCoins.find((obj) => +obj.rank === +itemIds[i]);
    let item = {};
    let count = [];
    for (let j = 0; j < items.length; j++) {
      const element = items[j];
      count.push(element.count);
    }
    if (a?.name != undefined) {
      item = {
        id: +a.rank,
        title: a.name,
        count: +count[i],
        price: +a.priceUsd,
      };
    } else {
      item = {};
    }
    coinsArr.push(item);
  }
  return coinsArr;
};
