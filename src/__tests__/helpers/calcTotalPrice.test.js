import { calcTotalPrice } from '../../libs/helpers/calcTotalPrice';

const items1 = [
  {
    price: 100,
    count: 4,
  },
  {
    price: 200000,
    count: 1925,
  },
  {
    price: 25000,
    count: 2,
  },
];

const items2 = [
  {
    price: 12,
    count: 0.25,
  },
  {
    price: 0.1,
    count: 1925,
  },
  {
    price: 25000,
    count: 2,
  },
];

describe('calcTotalPrice', () => {
  it('big value', () => {
    expect(calcTotalPrice(items1)).toBe(385050400);
  });

  it('low value', () => {
    expect(calcTotalPrice(items2)).toBe(50195.5);
  });

  it('empty array', () => {
    expect(calcTotalPrice([])).toBe(0);
  });
});
