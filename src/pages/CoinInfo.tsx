import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../libs/hooks/hooks';

import { fetchCurrentCoinInfo, fetchPriceInterval } from '../store/slices/chosenCoinSlice';
import { getCurrentPrice } from '../store/slices/portfolioSlice';
import { totalPorfolioPrice } from '../libs/helpers/calcCurrentPrice';

import { GET_ALL_COINS, GET_COIN_HISTORY, GET_ONE_COIN } from '../Apolo/query/coin';
import { useQuery } from '@apollo/client';

import AddButton from '../components/generic/Button/AddButton';
import PriceChart from '../components/PriceChart/PriceChart';

import { formatLowPrice } from '../libs/helpers/formatPrices';

interface LocationState {
  coinId: string;
}

export default function CoinInfo() {
  const location = useLocation();

  const { coinId } = location.state as LocationState;

  const dispatch = useAppDispatch();

  // const { coinInfo ,coinPriceInterval } = useAppSelector((state) => state.choosenCoinSlice);

  // fetch coins using Apolo + GraphQl from localhost:4000
  const [allCoins, setAllCoins] = useState<[]>([]);
  const { data, loading } = useQuery(GET_ALL_COINS);

  useEffect(() => {
    if (!loading) {
      setAllCoins(data.getAllCoins);
    }
  }, [data]);

  // fetch choosen coin info using Apolo + GraphQl from localhost:4000 ////////////////////////////////
  const [coinInfo, setCoinInfo] = useState<object[]>([]);
  const { data: oneCoin, loading: loadingOneCoin } = useQuery(GET_ONE_COIN, {
    variables: {
      coin: coinId,
    },
  });

  useEffect(() => {
    if (!loadingOneCoin) {
      setCoinInfo((prevValue: object[]) => [...prevValue, oneCoin.getCoinByName]);
    }
  }, [oneCoin]);

  // fetch choosen coin history using Apolo + GraphQl from localhost:4000 ////////////////////////////////
  const [coinPriceInterval, setCoinPriceInterval] = useState<[]>([]);
  const { data: coinHistoryPrice, loading: loadingCoinHistory } = useQuery(GET_COIN_HISTORY, {
    variables: {
      coin: coinId,
    },
  });

  useEffect(() => {
    if (!loadingCoinHistory) {
      setCoinPriceInterval(coinHistoryPrice.getCoinHistory);
    }
  }, [coinHistoryPrice]);

  // const allCoins = useAppSelector((state) => state.coinSlice.coins);
  const items = useAppSelector((state) => state.portfolioSlice.items);

  useEffect(() => {
    dispatch(getCurrentPrice(totalPorfolioPrice(allCoins, items)));
  }, [allCoins, items]);

  // useEffect(() => {
  //   dispatch(fetchCurrentCoinInfo(coinId));
  //   dispatch(fetchPriceInterval(coinId));
  // }, []);

  return (
    <div>
      <div>
        {coinInfo.map((el: any) => (
          <>
            <div className="info-block">
              <div key={el.rank}>
                <ul>
                  <li className="info-block__name" data-cy="info-block-name">
                    Name: {el.name}
                  </li>
                  <li className="info-block__price">
                    Price now: {formatLowPrice(el.priceUsd.toString())}$
                  </li>
                </ul>
              </div>
              <div>
                <AddButton rank={el.rank} name={el.name} price={+el.priceUsd} text={'+'} />
              </div>
            </div>
            <PriceChart
              name={el.name}
              coinPriceInterval={coinPriceInterval}
              borderColor={'rgb(255, 99, 132)'}
              backgroundColor={'rgba(255, 99, 132, 0.5)'}
              responsive={true}
              display={true}
            />
          </>
        ))}
      </div>
    </div>
  );
}
