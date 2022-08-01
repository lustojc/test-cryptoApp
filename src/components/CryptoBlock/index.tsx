import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

interface Crypto {
  name: string;
  id: number;
  rank: number;
}

export default function CryptoBlock() {
  const [coinsData, setCoinsData] = useState<Crypto[]>([]);

  const fetchCoins = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets?limit=10`);
    const data = await res.json();
    setCoinsData(data.data);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="crypto-block-wrapper">
      {coinsData.map((el) => {
        return (
          <div className="crypto-block" key={uuidv4()}>
            <div className="crypto-block__rank">{el.rank}.</div>
            <div className="crypto-block__title">{el.name}</div>
          </div>
        );
      })}
    </div>
  );
}
