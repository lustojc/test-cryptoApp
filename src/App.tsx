import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import CryptoBlock from './components/CryptoBlock';

import { useAppDispatch } from './libs/hooks/hooks';

import { fetchCoins } from './store/slices/coinSlice';

import './scss/app.scss';
import CoinInfo from './pages/CoinInfo';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  return (
    <div>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<CryptoBlock />} />
          <Route path="/coin/:id" element={<CoinInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
