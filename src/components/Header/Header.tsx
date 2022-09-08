import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { GET_ALL_COINS, GET_CURRENT_COINS } from '../../Apollo/query/coin';
import { useQuery } from '@apollo/client';

import { useAppDispatch, useAppSelector } from '../../libs/hooks/hooks';
import { formatLowPrice } from '../../libs/helpers/formatPrices';

import { Modal } from '../Modal/Modal';
import { totalPorfolioPrice } from '../../libs/helpers/calcCurrentPrice';
import { getCurrentPrice } from '../../store/slices/portfolioSlice';

import { QueryPopularCoins, PopularCoins, QueryPortfolioCoins } from './types';

export default function Header() {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const price = useAppSelector((state) =>
    formatLowPrice(state.portfolioSlice.totalPrice.toString()),
  );
  const currentPrice = useAppSelector((state) =>
    formatLowPrice(state.portfolioSlice.currentPortfolioPrice.toString()),
  );
  const items = useAppSelector((state) => state.portfolioSlice.items);

  const { data } = useQuery<QueryPopularCoins>(GET_ALL_COINS, {
    variables: {
      limit: 3,
      offset: 0,
    },
  });

  const searchQuery = items.map((el) => el.title).join(',');

  const { data: currentCoins } = useQuery<QueryPortfolioCoins>(GET_CURRENT_COINS, {
    skip: searchQuery === '',
    variables: {
      coins: searchQuery,
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentPrice(totalPorfolioPrice(currentCoins!?.getCurrentPortfolioCoins, items)));
  }, [currentCoins!?.getCurrentPortfolioCoins, items]);

  const priceDiff = parseFloat((+currentPrice - +price).toFixed(2));

  const percentDiff = +(100 - (+price * 100) / +currentPrice).toFixed(3) || 0;

  useEffect(() => {
    const json = JSON.stringify(items);
    localStorage.setItem('portfolio', json);
  }, [items]);

  useEffect(() => {
    if (modalActive) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
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
    <div className="header">
      <div className="header-container">
        <div>
          <Link to="/">
            <h1 className="header__title">Cryptocurrency App</h1>
          </Link>
          <div className="header-popular">
            {data?.getAllCoins.slice(0, 3).map((el: PopularCoins) => (
              <div className="header-popular__coin" key={el.id}>
                {el.name}: {formatLowPrice(el.priceUsd)}$
              </div>
            ))}
          </div>
        </div>
        <a
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
        </a>
        {modalActive && <Modal setModalActive={setModalActive} />}
      </div>
    </div>
  );
}
