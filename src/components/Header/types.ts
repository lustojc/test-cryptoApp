export interface TopCoins {
  priceUsd: string;
  name: string;
  id: string;
}

export interface QueryPopularCoins {
  getAllCoins: [TopCoins];
}

export interface PortfolioCoins {
  rank: string;
  priceUsd: string;
  name: string;
  id: string;
}

export interface QueryPortfolioCoins {
  getCurrentPortfolioCoins: [PortfolioCoins];
}
