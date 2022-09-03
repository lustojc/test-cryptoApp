import { gql } from '@apollo/client';

export const GET_ALL_COINS = gql`
  query getAllCoins($limit: Int, $offset: Int) {
    getAllCoins(limit: $limit, offset: $offset) {
      id
      rank
      name
      symbol
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;

export const GET_ONE_COIN = gql`
  query getCoinByName($coin: String) {
    getCoinByName(coin: $coin) {
      rank
      name
      priceUsd
      id
    }
  }
`;

export const GET_CURRENT_COINS = gql`
  query getCurrentPortfolioCoins($coins: String) {
    getCurrentPortfolioCoins(coins: $coins) {
      id
      rank
      name
      symbol
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;

export const GET_COIN_HISTORY = gql`
  query getCoinHistory($coin: String) {
    getCoinHistory(coin: $coin) {
      priceUsd
      time
    }
  }
`;
