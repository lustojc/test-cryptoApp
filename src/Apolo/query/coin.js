import { gql } from '@apollo/client';

export const GET_ALL_COINS = gql`
  query {
    getAllCoins {
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
