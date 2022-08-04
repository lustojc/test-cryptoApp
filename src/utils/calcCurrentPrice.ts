export const totalPorfolioPrice = (allCoins: any, items: any) => {
  const itemIds = items.map((el: any) => el.id);

  let coinsArr = [];
  for (let i = 0; i < itemIds.length; i++) {
    const a = allCoins.find((obj: { rank: any }) => +obj.rank === itemIds[i]);
    let item = {};
    let count = [];
    for (let j = 0; j < items.length; j++) {
      const element = items[j];
      count.push(element.count);
    }
    item = {
      id: +a?.rank,
      title: a?.name,
      count: +count[i],
      price: +a?.priceUsd,
    };
    coinsArr.push(item);
  }
  return coinsArr;
};
