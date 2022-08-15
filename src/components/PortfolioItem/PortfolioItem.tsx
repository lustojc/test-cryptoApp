import { useAppDispatch, useAppSelector } from '../../libs/hooks/hooks';

import { item, removeItem } from '../../store/slices/portfolioSlice';

import { formatLowPrice } from '../../libs/helpers/formatPrices';

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
            {formatLowPrice((coin.price * coin.count).toString())}$
          </div>
          <div className="portfolio-block__count">{formatLowPrice(coin.count?.toString())}</div>
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
