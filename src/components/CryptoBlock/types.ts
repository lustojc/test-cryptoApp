export interface Coin {
  id: string;
  rank: string;
  name: string;
  priceUsd: string;
  vwap24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  supply: string;
  changePercent24Hr: string;
}

export interface QueryData {
  getAllCoins: [Coin];
}

export interface CoinLimit {
  limit: number;
  offset: number;
}
