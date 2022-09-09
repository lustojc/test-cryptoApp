import { useQuery } from '@apollo/client';
import { GET_ALL_COINS } from '../../Apollo/query/coin';

import { formatLowPrice } from '../../libs/helpers/formatPrices';

import { TopCoins, QueryPopularCoins } from '../Header/types';

export default function PopularCoins() {
  const { data } = useQuery<QueryPopularCoins>(GET_ALL_COINS, {
    variables: {
      limit: 3,
      offset: 0,
    },
  });

  return (
    <div className="header-popular">
      {data?.getAllCoins.slice(0, 3).map((el: TopCoins) => (
        <div className="header-popular__coin" key={el.id}>
          {el.name}: {formatLowPrice(el.priceUsd)}$
        </div>
      ))}
    </div>
  );
}
