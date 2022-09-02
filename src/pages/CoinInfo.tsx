import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../libs/hooks/hooks';

import { fetchCurrentCoinInfo, fetchPriceInterval } from '../store/slices/chosenCoinSlice';
import { getCurrentPrice } from '../store/slices/portfolioSlice';
import { totalPorfolioPrice } from '../libs/helpers/calcCurrentPrice';

import { GET_ALL_COINS, GET_COIN_HISTORY, GET_ONE_COIN } from '../Apollo/query/coin';
import { useQuery } from '@apollo/client';

import AddButton from '../components/generic/Button/AddButton';
import PriceChart from '../components/PriceChart/PriceChart';

import { formatLowPrice } from '../libs/helpers/formatPrices';
import LineChart from '../components/LineChart/LineChart';

import { QueryData } from '../components/CryptoBlock';

interface LocationState {
  coinId: string;
}

interface coinInfo {
  rank: string;
  name: string;
  priceUsd: string;
}

interface OneCoin {
  getCoinByName: coinInfo;
}

interface CoinId {
  coin: string;
}

export interface CoinHistoryData {
  priceUsd: string;
  time: number;
}

export interface CoinHistoryPrice {
  getCoinHistory: [CoinHistoryData];
}

export default function CoinInfo() {
  const location = useLocation();

  const { coinId } = location.state as LocationState;

  const dispatch = useAppDispatch();

  const { data } = useQuery<QueryData>(GET_ALL_COINS);

  const [coinInfo, setCoinInfo] = useState<coinInfo[]>([]);
  const { data: oneCoin, loading: loadingOneCoin } = useQuery<OneCoin, CoinId>(GET_ONE_COIN, {
    variables: {
      coin: coinId,
    },
  });

  useEffect(() => {
    if (!loadingOneCoin) {
      setCoinInfo([oneCoin!.getCoinByName]);
    }
  }, [oneCoin]);

  const { data: coinHistoryPrice, loading: loadingCoinHistory } = useQuery<CoinHistoryPrice>(
    GET_COIN_HISTORY,
    {
      variables: {
        coin: coinId,
      },
    },
  );

  const items = useAppSelector((state) => state.portfolioSlice.items);

  useEffect(() => {
    if (data?.getAllCoins) {
      dispatch(getCurrentPrice(totalPorfolioPrice(data?.getAllCoins, items)));
    }
  }, [data?.getAllCoins, items]);

  return (
    <div>
      <div>
        {coinInfo.map((el: coinInfo) => (
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

            <LineChart
              coinPriceInterval={coinHistoryPrice!?.getCoinHistory}
              loadingCoinHistory={loadingCoinHistory}
            />
            <PriceChart
              name={el.name}
              coinPriceInterval={coinHistoryPrice!?.getCoinHistory}
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
