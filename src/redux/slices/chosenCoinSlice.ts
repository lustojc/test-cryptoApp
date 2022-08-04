import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchCurrentCoinInfo: any = createAsyncThunk('currentCoin/fetchCoin', async (coin) => {
  const { data } = await axios.get(`https://api.coincap.io/v2/assets/${coin}`);
  return data;
});

export const fetchPriceInterval: any = createAsyncThunk(
  'currentCoin/fetchPriceInterval',
  async (coin) => {
    const { data } = await axios.get(
      `https://api.coincap.io/v2/assets/${coin}/history?interval=m30`,
    );
    return data;
  },
);

interface currentCoin {
  coinInfo: any[];
  coinPriceInterval: any[];
  status: 'loading' | 'success' | 'error';
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
  extraReducers: {
    [fetchCurrentCoinInfo.pending]: (state: currentCoin) => {
      state.status = 'loading';
      state.coinInfo = [];
    },
    [fetchCurrentCoinInfo.fulfilled]: (state: currentCoin, action: any) => {
      const data = action.payload.data;
      state.coinInfo.push(data);
      state.status = 'success';
    },
    [fetchCurrentCoinInfo.refected]: (state: currentCoin) => {
      state.status = 'error';
      state.coinInfo = [];
    },

    [fetchPriceInterval.pending]: (state: currentCoin) => {
      state.status = 'loading';
      state.coinInfo = [];
    },
    [fetchPriceInterval.fulfilled]: (state: currentCoin, action: any) => {
      const data = action.payload.data;
      state.coinPriceInterval = data;
      state.status = 'success';
    },
    [fetchPriceInterval.refected]: (state: currentCoin) => {
      state.status = 'error';
      state.coinInfo = [];
    },
  },
});

export const {} = choosenCoinSlice.actions;

export default choosenCoinSlice.reducer;
