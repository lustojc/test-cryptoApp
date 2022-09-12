import { Link } from 'react-router-dom';

import Portfolio from '../Portfolio/Portfolio';
import PopularCoins from '../PopularCoins/PopularCoins';

export default function Header() {
  return (
    <div className="header">
      <div>
        <Link to="/">
          <h1 className="header__title">Cryptocurrency App</h1>
        </Link>
        <PopularCoins />
      </div>
      <Portfolio />
    </div>
  );
}
