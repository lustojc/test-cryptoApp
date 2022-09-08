import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { GET_COIN_HISTORY, GET_ONE_COIN } from '../Apollo/query/coin';
import { useQuery } from '@apollo/client';

import AddButton from '../components/generic/Button/AddButton';
import PriceChart from '../components/PriceChart/PriceChart';
import LineChart from '../components/LineChart/LineChart';

import { formatLowPrice } from '../libs/helpers/formatPrices';

import { LocationState, OneCoin, CoinId, CoinHistoryPrice, Info } from './types';

export default function CoinInfo() {
  const location = useLocation();

  const { coinId } = location.state as LocationState;

  const [coinInfo, setCoinInfo] = useState<Info[]>([]);
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

  return (
    <div>
      <div>
        {coinInfo.map((el: Info) => (
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
              <div className="info-block__btn">
                <AddButton
                  rank={el.rank}
                  name={el.name}
                  id={el.id}
                  price={+el.priceUsd}
                  text={'+'}
                />
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
