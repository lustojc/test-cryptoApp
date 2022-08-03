import { useState, useEffect, useRef } from 'react';

import { useAppSelector } from '../hooks/hooks';

import { Modal } from './UI/Modal';

export default function Header() {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const price = useAppSelector((state) => state.portfolioSlice.totalPrice.toFixed(2));

  const currentPrice = useAppSelector((state) =>
    state.portfolioSlice.currentPortfolioPrice.toFixed(2),
  );

  const items = useAppSelector((state) => state.portfolioSlice.items);

  const priceDiff = parseFloat((+price - +currentPrice).toFixed(2));

  const percentDiff = +(100 - (+currentPrice * 100) / +price).toFixed(3) || 0;

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('portfolio', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__info">
          <div>
            <h1>Cryptocurrency App</h1>
          </div>
        </div>
        <div className="header__portfolio" onClick={() => setModalActive(true)}>
          <div>My Portfolio</div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>{price} USD </div>
            <div style={priceDiff >= 0 ? { color: 'green' } : { color: 'red' }}>
              {priceDiff > 0 ? '+' : ''}
              {priceDiff} $
            </div>
            <div
              style={
                +percentDiff > 0
                  ? { color: 'green', marginLeft: '10px' }
                  : { color: 'red', marginLeft: '10px' }
              }>
              ({percentDiff})%
            </div>
          </div>
        </div>
        {modalActive && <Modal setModalActive={setModalActive} />}
      </div>
    </div>
  );
}
