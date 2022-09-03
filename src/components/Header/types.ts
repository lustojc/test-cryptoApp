export interface PopularCoins {
  priceUsd: string;
  name: string;
  id: string;
}

export interface QueryPopularCoins {
  getAllCoins: [PopularCoins];
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
