import { useState, useEffect, useRef } from 'react';

import { useAppSelector } from '../hooks/hooks';

import { Modal } from './UI/Modal';

export default function Header() {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const price = useAppSelector((state) => state.portfolioSlice.totalPrice.toFixed(2));
  const items = useAppSelector((state) => state.portfolioSlice.items);

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
          <div>{price} USD +2,38 (1,80 %).</div>
        </div>
        {modalActive && <Modal setModalActive={setModalActive} />}
      </div>
    </div>
  );
}
