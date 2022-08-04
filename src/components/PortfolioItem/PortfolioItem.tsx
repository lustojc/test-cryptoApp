import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { removeItem } from '../../redux/slices/portfolioSlice';

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
      {userCoins.map((coin: any) => (
        <div key={coin.id} className="portfolio-block">
          <div className="portfolio-block__rank">{coin.id}.</div>
          <div className="portfolio-block__title">{coin.title}</div>
          <div className="portfolio-block__price">{(coin.price * coin.count).toFixed(2)}$</div>
          <div className="portfolio-block__count">{coin.count.toFixed(3)}</div>
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
