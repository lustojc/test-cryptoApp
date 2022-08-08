import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { getCurrentPrice } from '../../redux/slices/portfolioSlice';
import { totalPorfolioPrice } from '../../utils/calcCurrentPrice';

import Pagination from '../Pagination';
import AddButton from '../Button/AddButton';

import { shortPrices, shortLowValue } from '../../utils/shortPrices';

interface Coin {
  id: number;
  rank: string;
  name: string;
  priceUsd: string;
  vwap24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  supply: string;
  changePercent24Hr: string;
}

export default function CryptoBlock() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage] = useState<number>(10);

  const dispatch = useAppDispatch();

  const allCoins = useAppSelector((state) => state.coinSlice.coins);
  const items = useAppSelector((state) => state.portfolioSlice.items);

  useEffect(() => {
    dispatch(getCurrentPrice(totalPorfolioPrice(allCoins, items)));
  }, [allCoins, items]);

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = allCoins.slice(firstCoinIndex, lastCoinIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="crypto-block-wrapper">
        <div>
          <ul className="crypto-block__descriptions">
            <li>Rank</li>
            <li>Name</li>
            <li>Price</li>
            <li>Market Cap</li>
            <li>VWAP</li>
            <li>Supply</li>
            <li>Volume(24Hr)</li>
            <li>Change(24Hr)</li>
          </ul>
        </div>
        <div>
          {currentCoins.map((coin: Coin) => (
            <div key={coin.rank} className="crypto-block">
              <div>
                <Link to={'/coin/' + coin.id} state={{ coinId: coin.id }}>
                  <ul className="crypto-block__info" key={uuidv4()}>
                    <li className="crypto-block__rank">{coin.rank}</li>
                    <li className="crypto-block__title">{coin.name}</li>
                    <li className="crypto-block__price">${shortLowValue(coin.priceUsd)}</li>
                    <li className="crypto-block__marketCap">${shortPrices(coin.marketCapUsd)}</li>
                    <li className="crypto-block__vwap">${shortLowValue(coin.vwap24Hr)}</li>
                    <li className="crypto-block__supply">${shortPrices(coin.supply)}</li>
                    <li className="crypto-block__volume">${shortPrices(coin.volumeUsd24Hr)}</li>
                    <li
                      className="crypto-block__volume"
                      style={
                        coin.changePercent24Hr.startsWith('-')
                          ? { color: 'red' }
                          : { color: 'green' }
                      }>
                      {(+coin.changePercent24Hr).toFixed(2)}%
                    </li>
                  </ul>
                </Link>
              </div>
              <div>
                <AddButton rank={coin.rank} name={coin.name} price={+coin.priceUsd} text={'+'} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination coinsPerPage={coinsPerPage} totalCoins={allCoins.length} paginate={paginate} />
    </>
  );
}
