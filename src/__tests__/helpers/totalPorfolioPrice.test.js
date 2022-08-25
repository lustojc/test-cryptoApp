import { totalPorfolioPrice } from '../../libs/helpers/calcCurrentPrice';

const currentCoinsState = [
  {
    rank: 1,
    priceUsd: 21000,
    name: 'Bitcoin',
  },
  {
    rank: 2,
    priceUsd: 1900,
    name: 'Eherium',
  },
];

const coinsInPortfolio = [
  {
    id: 1,
    title: 'Bitcoin',
    price: 20565,
    count: 135,
  },
  {
    id: 2,
    title: 'Eherium',
    price: 1800,
    count: 7,
  },
];
describe('calculate total portfolio price', () => {
  it('correct values', () => {
    expect(totalPorfolioPrice(currentCoinsState, coinsInPortfolio)).toEqual([
      {
        count: 135,
        id: 1,
        price: 21000,
        title: 'Bitcoin',
      },
      {
        count: 7,
        id: 2,
        price: 1900,
        title: 'Eherium',
      },
    ]);
  });

  it('one correct value and one empty array', () => {
    expect(totalPorfolioPrice(currentCoinsState, [])).toEqual([]);
    expect(totalPorfolioPrice([], coinsInPortfolio)).toEqual([]);
  });

  it('two empty array', () => {
    expect(totalPorfolioPrice([], [])).toEqual([]);
  });
});
