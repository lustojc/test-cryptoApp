import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_CURRENT_COINS } from '../../Apollo/query/coin';

import { totalPorfolioPrice } from '../../libs/helpers/calcCurrentPrice';
import { formatLowPrice } from '../../libs/helpers/formatPrices';
import { useAppDispatch, useAppSelector } from '../../libs/hooks/hooks';
import { useScrollBlock } from '../../libs/hooks/useScrollBlock';

import { getCurrentPrice } from '../../store/slices/portfolioSlice';

import { QueryPortfolioCoins } from '../Header/types';

import { Modal } from '../Modal/Modal';

export default function Portfolio() {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const items = useAppSelector((state) => state.portfolioSlice.items);

  const searchQuery = items.map((el) => el.title).join(',');

  const { data: currentCoins } = useQuery<QueryPortfolioCoins>(GET_CURRENT_COINS, {
    skip: searchQuery === '',
    variables: {
      coins: searchQuery,
    },
  });

  const dispatch = useAppDispatch();

  const price = useAppSelector((state) =>
    formatLowPrice(state.portfolioSlice.totalPrice.toString()),
  );

  const currentPrice = useAppSelector((state) =>
    formatLowPrice(state.portfolioSlice.currentPortfolioPrice.toString()),
  );

  const priceDiff = parseFloat((+currentPrice - +price).toFixed(2));

  const percentDiff = +(100 - (+price * 100) / +currentPrice).toFixed(3) || 0;

  useEffect(() => {
    dispatch(getCurrentPrice(totalPorfolioPrice(currentCoins!?.getCurrentPortfolioCoins, items)));
  }, [currentCoins!?.getCurrentPortfolioCoins, items]);

  useEffect(() => {
    const json = JSON.stringify(items);
    localStorage.setItem('portfolio', json);
  }, [items]);

  useEffect(() => {
    if (modalActive) {
      blockScroll();
    }
    return () => {
      allowScroll();
    };
  }, [modalActive]);

  useEffect(() => {
    const closeModal = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        setModalActive(false);
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  return (
    <>
      <div
        className="header-portfolio"
        data-cy="header-portfolio"
        onClick={() => setModalActive(true)}>
        <div className="header-portfolio__title">My Portfolio</div>
        <div className="header-portfolio__info">
          <div data-cy="header-price" className="header-portfolio__price">
            {currentPrice} USD{' '}
          </div>
          <div className={`${priceDiff >= 0 ? 'positive-value' : 'negative-value'}`}>
            {priceDiff > 0 ? '+' : ''}
            {priceDiff} $
          </div>
          <div
            className={`header-portfolio__diffPercents ${
              +percentDiff >= 0 ? 'positive-value' : 'negative-value'
            }`}>
            ({percentDiff})%
          </div>
        </div>
      </div>
      {modalActive && <Modal setModalActive={setModalActive} />}
    </>
  );
}
