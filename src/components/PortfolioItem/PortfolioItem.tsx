import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { item, removeItem } from '../../redux/slices/portfolioSlice';

import { shortLowValue } from '../../utils/shortPrices';

const PortfolioItem = () => {
  const dispatch = useAppDispatch();
  const userCoins = useAppSelector((state) => state.portfolioSlice.items);

  const onClickRemove = (id: number, price: number, count: number) => {
    if (window.confirm('Are you sure?')) {
      const item = {
        id,
        currentTotalPrice: price * count,
      };
      dispatch(removeItem(item));
    }
  };

  return (
    <div className="portfolio-wrapper">
      <div className="portfolio-settings">
        <div>Rank</div>
        <div>Name</div>
        <div>Total $</div>
        <div>Amount</div>
      </div>
      {userCoins.map((coin: item) => (
        <div key={coin.id} className="portfolio-block">
          <div className="portfolio-block__rank">{coin.id}.</div>
          <div className="portfolio-block__title">{coin.title}</div>
          <div className="portfolio-block__price">
            {shortLowValue((coin.price * coin.count).toString())}$
          </div>
          <div className="portfolio-block__count">{coin.count?.toFixed(3)}</div>
          <div
            onClick={() => onClickRemove(coin.id, coin.price, coin.count)}
            className="portfolio-block__deleteBtn">
            X
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioItem;
