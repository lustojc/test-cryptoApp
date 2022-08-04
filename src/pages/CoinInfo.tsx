import { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { fetchCurrentCoinInfo, fetchPriceInterval } from '../redux/slices/chosenCoinSlice';
import { addItems, getCurrentPrice } from '../redux/slices/portfolioSlice';
import { totalPorfolioPrice } from '../utils/calcCurrentPrice';

import AddButton from '../components/Button/AddButton';
import PriceChart from '../components/PriceChart/PriceChart';

export default function CoinInfo() {
  const location = useLocation();

  const { coinId }: any = location.state;

  const dispatch = useAppDispatch();

  const { coinInfo, coinPriceInterval } = useAppSelector((state) => state.choosenCoinSlice);

  const allCoins = useAppSelector((state) => state.coinSlice.coins);
  const items = useAppSelector((state) => state.portfolioSlice.items);

  const onClickAdd = (id: number, title: string, price: number) => {
    const amount = prompt('How many coins do you want to add to your portfolio?');
    const item = {
      id,
      title,
      price,
      amount,
    };
    dispatch(addItems(item));
  };

  useEffect(() => {
    dispatch(getCurrentPrice(totalPorfolioPrice(allCoins, items)));
  }, [allCoins, items]);

  useEffect(() => {
    dispatch(fetchCurrentCoinInfo(coinId));
    dispatch(fetchPriceInterval(coinId));
  }, []);

  return (
    <div>
      <div>
        {coinInfo.map((el) => (
          <>
            <div className="info-block-wrapper">
              <div className="info-block" key={el.rank}>
                <ul>
                  <li className="info-block__name">Name: {el.name}</li>
                  <li className="info-block__price">
                    Price now: {parseFloat(el.priceUsd).toFixed(2)}$
                  </li>
                </ul>
              </div>
              <div>
                <AddButton
                  onClickAdd={onClickAdd}
                  rank={+el.rank}
                  name={el.name}
                  price={+el.priceUsd}
                  text={'+'}
                />
              </div>
            </div>
            <PriceChart name={el.name} coinPriceInterval={coinPriceInterval} />
          </>
        ))}
      </div>
    </div>
  );
}
