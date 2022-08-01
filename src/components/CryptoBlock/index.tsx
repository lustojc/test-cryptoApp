import { v4 as uuidv4 } from 'uuid';

interface props {
  currentCoins: Array<Crypto>;
}

interface Crypto {
  name: string;
  rank: number;
}

export default function CryptoBlock({ currentCoins }: props) {
  return (
    <div className="crypto-block-wrapper">
      {currentCoins.map((coin) => (
        <div className="crypto-block" key={uuidv4()}>
          <div className="crypto-block__rank">{coin.rank}.</div>
          <div className="crypto-block__title">{coin.name}</div>
        </div>
      ))}
    </div>
  );
}
