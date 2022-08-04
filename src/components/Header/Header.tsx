import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';

import { Modal } from '../Modal/Modal';

export default function Header() {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const price = useAppSelector((state) => state.portfolioSlice.totalPrice.toFixed(2));
  const currentPrice = useAppSelector((state) =>
    state.portfolioSlice.currentPortfolioPrice.toFixed(2),
  );
  const items = useAppSelector((state) => state.portfolioSlice.items);

  const allCoins = useAppSelector((state) => state.coinSlice.coins);

  const priceDiff = parseFloat((+price - +currentPrice).toFixed(2));

  const percentDiff = +(100 - (+currentPrice * 100) / +price).toFixed(3) || 0;

  useEffect(() => {
    const json = JSON.stringify(items);
    localStorage.setItem('portfolio', json);
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__info">
          <div>
            <Link to="/">
              <h1 className="header__title">Cryptocurrency App</h1>
            </Link>
            <div className="header-popular">
              {allCoins.slice(0, 3).map((el: any) => (
                <div className="header-popular__coin" key={el.id}>
                  {el.name}: {parseFloat(el.priceUsd).toFixed(2)}$
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="header-portfolio" onClick={() => setModalActive(true)}>
          <div className="header-portfolio__title">My Portfolio</div>
          <div className="header-portfolio__info">
            <div className="header-portfolio__price">{price} USD </div>
            <div style={priceDiff >= 0 ? { color: 'green' } : { color: 'red' }}>
              {priceDiff > 0 ? '+' : ''}
              {priceDiff} $
            </div>
            <div
              className="header-portfolio__diffPercents"
              style={+percentDiff >= 0 ? { color: 'green' } : { color: 'red' }}>
              ({percentDiff})%
            </div>
          </div>
        </div>
        {modalActive && <Modal setModalActive={setModalActive} />}
      </div>
    </div>
  );
}
