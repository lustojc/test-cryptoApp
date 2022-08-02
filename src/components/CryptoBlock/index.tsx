import { v4 as uuidv4 } from 'uuid';

interface props {
  currentCoins: Array<Crypto>;
}

interface Crypto {
  name: string;
  rank: string;
  priceUsd: string;
  marketCapUsd: string;
  vwap24Hr: string;
  supply: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
}

export default function CryptoBlock({ currentCoins }: props) {
  return (
    <div className="crypto-block-wrapper">
      <table className="crypto-block">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>VWAP</th>
            <th>Supply</th>
            <th>Volume(24Hr)</th>
            <th>Change(24Hr)</th>
          </tr>
        </thead>

        {currentCoins.map((coin) => (
          <tbody key={uuidv4()}>
            <tr className="test" onClick={() => console.log('Клик по ховеру')}>
              <td className="crypto-block__rank">{coin.rank}</td>
              <td className="crypto-block__title">{coin.name}</td>
              <td className="crypto-block__price">${parseFloat(coin.priceUsd).toFixed(2)}</td>
              <td className="crypto-block__marketCap">
                ${(parseFloat(coin.marketCapUsd) / 1000000000).toFixed(2)}b
              </td>
              <td className="crypto-block__vwap">${parseFloat(coin.vwap24Hr).toFixed(2)}</td>
              <td className="crypto-block__supply">
                ${(parseFloat(coin.supply) / 1000000).toFixed(2)}m
              </td>
              <td className="crypto-block__volume">
                ${(parseFloat(coin.volumeUsd24Hr) / 1000000000).toFixed(2)}b
              </td>
              <td
                className="crypto-block__volume"
                style={
                  coin.changePercent24Hr.startsWith('-') ? { color: 'red' } : { color: 'green' }
                }>
                {parseFloat(coin.changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
            <div>
              <button onClick={() => console.log('Click')} className="crypto-block__btn">
                +
              </button>
            </div>
          </tbody>
        ))}
      </table>
    </div>
  );
}
