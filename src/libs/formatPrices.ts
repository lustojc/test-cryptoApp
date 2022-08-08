export const formatPrices = (price: string) => {
  if (+price > 10000000000000) {
    return `${(parseFloat(price) / 1000000000000).toFixed(2)}t`;
  } else if (+price > 1000000000) {
    return `${(parseFloat(price) / 1000000000).toFixed(2)}b`;
  } else if (+price > 1000000) {
    return `${(parseFloat(price) / 1000000).toFixed(2)}m`;
  } else if (+price > 10000) {
    return `${(parseFloat(price) / 1000).toFixed(2)}k`;
  }
};

export const formatLowPrice = (value: string) => {
  if (+value < 0.001) {
    return `${(+value).toFixed(6)}`;
  } else {
    return `${(+value).toFixed(2)}`;
  }
};
