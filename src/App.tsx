import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import CryptoBlock from './components/CryptoBlock';

import { useAppDispatch } from './libs/hooks/hooks';

import './scss/app.scss';

import CoinInfo from './pages/CoinInfo';

function App() {
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
