import { useAppDispatch, useAppSelector } from '../../libs/hooks/hooks';

import { item, removeItem } from '../../store/slices/portfolioSlice';

import { formatLowPrice } from '../../libs/helpers/formatPrices';
import { DonutChart } from '../DonutChart/DonutChart';

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
    <div data-cy="portfolio" className="portfolio-wrapper">
      <div className="portfolio-settings">
        <div className="portfolio-settings__title">Rank</div>
        <div className="portfolio-settings__title">Name</div>
        <div className="portfolio-settings__title">Total $</div>
        <div className="portfolio-settings__title">Amount</div>
      </div>
      {userCoins.map((coin: item) => (
        <div key={coin.id} data-cy="portfolio-item" className="portfolio-block">
          <div className="portfolio-block__rank">{coin.id}.</div>
          <div className="portfolio-block__title">{coin.title}</div>
          <div className="portfolio-block__price">
            {formatLowPrice((coin.price * coin.count).toString())}$
          </div>
          <div data-cy="portfolio-item-count" className="portfolio-block__count">
            {formatLowPrice(coin.count?.toString())}
          </div>
          <div
            data-cy="portfolio-deleteBtn"
            onClick={() => onClickRemove(coin.id, coin.price, coin.count)}
            className="portfolio-block__deleteBtn">
            X
          </div>
        </div>
      ))}
      <DonutChart data={userCoins} width={350} height={350} />
    </div>
  );
};

export default PortfolioItem;
