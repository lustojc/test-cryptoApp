import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchCurrentCoinInfo = createAsyncThunk(
  'currentCoin/fetchCoin',
  async (coin: string) => {
    const { data } = await axios.get(`https://api.coincap.io/v2/assets/${coin}`);
    return data;
  },
);

export const fetchPriceInterval = createAsyncThunk(
  'currentCoin/fetchPriceInterval',
  async (coin: string) => {
    const { data } = await axios.get(
      `https://api.coincap.io/v2/assets/${coin}/history?interval=m30`,
    );
    return data;
  },
);

type coinInfo = {
  rank: string;
  name: string;
  priceUsd: number;
};

interface currentCoin {
  coinInfo: coinInfo[];
  coinPriceInterval: [];
  status: 'loading' | 'success' | 'error';
}

interface actionCoinTypes {
  payload: {
    data: coinInfo;
  };
}

interface actionIntervalTypes {
  payload: {
    data: [];
  };
}

const initialState: currentCoin = {
  coinInfo: [],
  coinPriceInterval: [],
  status: 'loading',
};

export const choosenCoinSlice = createSlice({
  name: 'currentCoin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCoinInfo.pending, (state: currentCoin, action) => {
      state.status = 'loading';
      state.coinInfo = [];
    });
    builder.addCase(
      fetchCurrentCoinInfo.fulfilled,
      (state: currentCoin, action: actionCoinTypes) => {
        state.coinInfo.push(action.payload.data);
        state.status = 'success';
      },
    );
    builder.addCase(fetchCurrentCoinInfo.rejected, (state: currentCoin) => {
      state.status = 'error';
      state.coinInfo = [];
    });

    builder.addCase(fetchPriceInterval.pending, (state: currentCoin) => {
      state.status = 'loading';
      state.coinPriceInterval = [];
    });

    builder.addCase(
      fetchPriceInterval.fulfilled,
      (state: currentCoin, action: actionIntervalTypes) => {
        state.coinPriceInterval = action.payload.data;
        state.status = 'success';
      },
    );

    builder.addCase(fetchPriceInterval.rejected, (state: currentCoin) => {
      state.status = 'error';
      state.coinPriceInterval = [];
    });
  },
});

export const {} = choosenCoinSlice.actions;

export default choosenCoinSlice.reducer;
