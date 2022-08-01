import Header from './components/Header';
import CryptoBlock from './components/CryptoBlock';

import './scss/app.scss';

function App() {
  return (
    <div>
      <div className="wrapper">
        <Header />
        <CryptoBlock />
      </div>
    </div>
  );
}

export default App;
