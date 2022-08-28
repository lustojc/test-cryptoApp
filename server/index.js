const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const { default: axios } = require('axios');
const app = express();

app.use(cors());

const root = {
  getAllCoins: async () => {
    const { data } = await axios.get(`https://api.coincap.io/v2/assets`);
    return data.data;
  },
  getCoinByName: async ({ coin }) => {
    const { data } = await axios.get(`https://api.coincap.io/v2/assets/${coin}`);
    return data.data;
  },
  getCoinHistory: async ({ coin }) => {
    const { data } = await axios.get(
      `https://api.coincap.io/v2/assets/${coin}/history?interval=m30`,
    );
    return data.data;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
