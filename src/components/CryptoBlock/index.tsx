import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Route, Routes, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { addItems, getCurrentPrice } from '../../redux/slices/portfolioSlice';
import Pagination from '../Pagination';

export default function CryptoBlock() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage] = useState<number>(10);

  const dispatch = useAppDispatch();

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

  const totalPorfolioPrice = (allCoins: any, items: any) => {
    const itemIds = items.map((el: any) => el.id);

    let coinsArr = [];
    for (let i = 0; i < itemIds.length; i++) {
      const a = allCoins.find((obj: { rank: any }) => +obj.rank === itemIds[i]);
      let item = {};
      let count = [];
      for (let j = 0; j < items.length; j++) {
        const element = items[j];
        count.push(element.count);
      }
      item = {
        id: +a?.rank,
        title: a?.name,
        count: +count[i],
        price: +a?.priceUsd,
      };
      coinsArr.push(item);
    }
    return coinsArr;
  };

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
          {currentCoins.map((coin: any) => (
            <div className="crypto-block">
              <div>
                <Link to={'/coin/' + coin.rank}>
                  <ul className="crypto-block__info" key={uuidv4()}>
                    <li className="crypto-block__rank">{coin.rank}</li>
                    <li className="crypto-block__title">{coin.name}</li>
                    <li className="crypto-block__price">${parseFloat(coin.priceUsd).toFixed(2)}</li>
                    <li className="crypto-block__marketCap">
                      ${(parseFloat(coin.marketCapUsd) / 1000000000).toFixed(2)}b
                    </li>
                    <li className="crypto-block__vwap">${parseFloat(coin.vwap24Hr).toFixed(2)}</li>
                    <li className="crypto-block__supply">
                      ${(parseFloat(coin.supply) / 1000000).toFixed(2)}m
                    </li>
                    <li className="crypto-block__volume">
                      ${(parseFloat(coin.volumeUsd24Hr) / 1000000000).toFixed(2)}b
                    </li>
                    <li
                      className="crypto-block__volume"
                      style={
                        coin.changePercent24Hr.startsWith('-')
                          ? { color: 'red' }
                          : { color: 'green' }
                      }>
                      {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                    </li>
                  </ul>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => onClickAdd(+coin.rank, coin.name, +coin.priceUsd)}
                  className="crypto-block__btn">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination coinsPerPage={coinsPerPage} totalCoins={allCoins.length} paginate={paginate} />
    </>
  );
}
