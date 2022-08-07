interface itemCount {
  price: number;
  count: number;
}

export const calcTotalPrice = (items: itemCount[]) => {
  return items.reduce((sum: number, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
