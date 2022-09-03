const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type Coin {
        id: String,
        rank: String,
        name: String,
        symbol: String,
        supply: String,
        maxSupply: String,
        marketCapUsd: String,
        volumeUsd24Hr: String,
        priceUsd: String,
        changePercent24Hr: String,
        vwap24Hr: String,

    }

    type CoinHistory {
        priceUsd: String,
        time: Float
    }

    type Query {
        getAllCoins(limit: Int, offset: Int): [Coin]
        getCurrentPortfolioCoins(coins: String): [Coin]
        getCoinByName(coin: String): Coin
        getCoinHistory(coin: String): [CoinHistory]
    }

`);

module.exports = schema;
