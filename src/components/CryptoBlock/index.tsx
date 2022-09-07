import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import Pagination from '../Pagination';
import AddButton from '../generic/Button/AddButton';

import { formatPrices, formatLowPrice } from '../../libs/helpers/formatPrices';

import { GET_ALL_COINS } from '../../Apollo/query/coin';
import { useQuery } from '@apollo/client';
import { QueryData, Coin, CoinLimit } from './types';

export default function CryptoBlock() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage] = useState<number>(10);

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;

  const { data: allCoins, loading } = useQuery<QueryData, CoinLimit>(GET_ALL_COINS, {
    variables: {
      limit: coinsPerPage,
      offset: firstCoinIndex,
    },
  });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <h1>Loading......</h1>;
  }

  return (
    <>
      <div className="crypto-block-wrapper">
        <div>
          <ul className="crypto-block__descriptions">
            <li className="crypto-block__descriptions-title">Rank</li>
            <li className="crypto-block__descriptions-title">Name</li>
            <li className="crypto-block__descriptions-title">Price</li>
            <li className="crypto-block__descriptions-title">Market Cap</li>
            <li className="crypto-block__descriptions-title">VWAP</li>
            <li className="crypto-block__descriptions-title">Supply</li>
            <li className="crypto-block__descriptions-title">Volume(24Hr)</li>
            <li className="crypto-block__descriptions-title">Change(24Hr)</li>
          </ul>
        </div>
        <div>
          {allCoins?.getAllCoins.map((coin: Coin) => (
            <div key={coin.rank} className="crypto-block">
              <div>
                <Link to={'/coin/' + coin.id} state={{ coinId: coin.id }}>
                  <ul className="crypto-block__info" data-cy="crypto-block-info" key={uuidv4()}>
                    <li className="crypto-block__rank list">{coin.rank}</li>
                    <li className="crypto-block__title list" data-cy="crypto-block-title">
                      {coin.name}
                    </li>
                    <li className="crypto-block__price list">${formatLowPrice(coin.priceUsd)}</li>
                    <li className="crypto-block__marketCap list">
                      ${formatPrices(coin.marketCapUsd)}
                    </li>
                    <li className="crypto-block__vwap list">${formatLowPrice(coin.vwap24Hr)}</li>
                    <li className="crypto-block__supply list">${formatPrices(coin.supply)}</li>
                    <li className="crypto-block__volume list">
                      ${formatPrices(coin.volumeUsd24Hr)}
                    </li>
                    <li
                      className={`crypto-block__volume list ${
                        coin.changePercent24Hr.startsWith('-') ? 'negative-value' : 'positive-value'
                      }`}>
                      {(+coin.changePercent24Hr).toFixed(2)}%
                    </li>
                  </ul>
                </Link>
              </div>
              <div>
                <AddButton
                  rank={coin.rank}
                  name={coin.name}
                  id={coin.id}
                  price={+coin.priceUsd}
                  text={'+'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination paginate={paginate} currentPage={currentPage} />
    </>
  );
}
