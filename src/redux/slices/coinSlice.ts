import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchCoins: any = createAsyncThunk('coins/fetchAll', async () => {
  const { data } = await axios.get(`https://api.coincap.io/v2/assets`);
  return data;
});

interface coins {
  coins: [];
  status: 'loading' | 'success' | 'error';
}

const initialState: coins = {
  coins: [],
  status: 'loading',
};

export const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setItems(state, action) {
      state.coins = action.payload;
    },
  },
  extraReducers: {
    [fetchCoins.pending]: (state: coins) => {
      state.status = 'loading';
      state.coins = [];
    },
    [fetchCoins.fulfilled]: (state: coins, action) => {
      state.coins = action.payload.data;
      state.status = 'success';
    },
    [fetchCoins.refected]: (state: coins) => {
      state.status = 'error';
      state.coins = [];
    },
  },
});

export const { setItems } = coinSlice.actions;

export default coinSlice.reducer;
