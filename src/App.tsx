import { useState, useEffect } from 'react';

import Header from './components/Header';
import CryptoBlock from './components/CryptoBlock';
import Pagination from './components/Pagination';

import './scss/app.scss';

function App() {
  const [coinsData, setCoinsData] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage] = useState<number>(10);

  const fetchCoins = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets`);
    const data = await res.json();
    setCoinsData(data.data);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = coinsData.slice(firstCoinIndex, lastCoinIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="wrapper">
        <Header />
        <CryptoBlock currentCoins={currentCoins} />
        <Pagination coinsPerPage={coinsPerPage} totalCoins={coinsData.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default App;
