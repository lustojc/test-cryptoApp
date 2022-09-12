import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import CryptoBlock from './components/CryptoBlock';

import { useAppSelector } from './libs/hooks/hooks';

import './scss/app.scss';

import CoinInfo from './pages/CoinInfo';

const rootEl = document.getElementById('root');

function App() {
  const isModalOpen = useAppSelector((state) => state.modalSlice.isOpen);

  useEffect(() => {
    if (isModalOpen) {
      rootEl?.classList.add('modal-open');
    }
    return () => rootEl?.classList.remove('modal-open');
  }, [isModalOpen]);

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
