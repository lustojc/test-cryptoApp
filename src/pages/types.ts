export interface LocationState {
  coinId: string;
}

export interface Info {
  rank: string;
  name: string;
  priceUsd: string;
  id: string;
}

export interface OneCoin {
  getCoinByName: Info;
}

export interface CoinId {
  coin: string;
}

export interface CoinHistoryData {
  priceUsd: string;
  time: number;
}

export interface CoinHistoryPrice {
  getCoinHistory: [CoinHistoryData];
}
