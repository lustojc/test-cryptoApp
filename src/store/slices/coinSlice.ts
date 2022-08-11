import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchCoins = createAsyncThunk('coins/fetchAll', async () => {
  const { data } = await axios.get(`https://api.coincap.io/v2/assets`);
  return data;
});

export interface coins {
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
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.pending, (state: coins) => {
      state.status = 'loading';
      state.coins = [];
    });

    builder.addCase(fetchCoins.fulfilled, (state: coins, action) => {
      state.coins = action.payload.data;
      state.status = 'success';
    });
    builder.addCase(fetchCoins.rejected, (state: coins) => {
      state.coins = [];
      state.status = 'error';
    });
  },
});

export const { setItems } = coinSlice.actions;

export default coinSlice.reducer;
