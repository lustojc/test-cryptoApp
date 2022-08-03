import { useState, useEffect } from 'react';

import Header from './components/Header';
import CryptoBlock from './components/CryptoBlock';
import Pagination from './components/Pagination';

import { useAppDispatch, useAppSelector } from './hooks/hooks';

import { fetchCoins } from './redux/slices/coinSlice';

import './scss/app.scss';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage] = useState<number>(10);

  const allCoins = useAppSelector((state) => state.coinSlice.coins);

  const dispatch = useAppDispatch();

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = allCoins.slice(firstCoinIndex, lastCoinIndex);

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="wrapper">
        <Header />
        <CryptoBlock currentCoins={currentCoins} />
        <Pagination coinsPerPage={coinsPerPage} totalCoins={allCoins.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default App;
