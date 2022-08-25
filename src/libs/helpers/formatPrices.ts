export const formatPrices = (price: string) => {
  if (+price > 1000000000000) {
    return `${(parseFloat(price) / 1000000000000).toFixed(2)}t`;
  } else if (+price > 1000000000) {
    return `${(parseFloat(price) / 1000000000).toFixed(2)}b`;
  } else if (+price > 1000000) {
    return `${(parseFloat(price) / 1000000).toFixed(2)}m`;
  } else if (+price > 1000) {
    return `${(parseFloat(price) / 1000).toFixed(2)}k`;
  } else {
    return null;
  }
};

export const formatLowPrice = (value: string) => {
  if (value === null) {
    return '  -';
  } else if (+value == 0) {
    return `${+value}`;
  } else if (+value < 0.001) {
    return `${(+value).toFixed(6)}`;
  } else if (+value < 0.01) {
    return `${(+value).toFixed(4)}`;
  } else {
    return `${(+value).toFixed(2)}`;
  }
};
