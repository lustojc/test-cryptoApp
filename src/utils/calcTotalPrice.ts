interface coinObj {
  count: number;
  price: number;
  tittle: string;
  id: number;
}

export const calcTotalPrice = (items: any) => {
  return items.reduce((sum: number, obj: coinObj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
