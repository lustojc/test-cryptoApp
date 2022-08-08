import { createSlice } from '@reduxjs/toolkit';

import { calcTotalPrice } from '../../libs/calcTotalPrice';
import { getPortfolioFromLS } from '../../libs/getPortfolioFromLS';

export type item = {
  id: number;
  title: string;
  price: number;
  count: number;
};

export interface items {
  items: item[];
  totalPrice: number;
  currentPortfolioPrice: number;
}

const { items, totalPrice } = getPortfolioFromLS();

const initialState: items = {
  items,
  totalPrice,
  currentPortfolioPrice: 0,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addItems(state: items, action) {
      const findItem = state.items.find((obj: { id: number }) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count += +action.payload.amount;
      } else {
        state.items.push({
          ...action.payload,
          count: +action.payload.amount,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    getCurrentPrice(state, action) {
      state.currentPortfolioPrice = calcTotalPrice(action.payload);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj: { id: number }) => obj.id !== action.payload.id);
      if (state.totalPrice >= 0) {
        state.totalPrice = state.totalPrice - action.payload.currentTotalPrice;
      } else {
        state.totalPrice = 0;
      }
    },
  },
});

export const { addItems, removeItem, getCurrentPrice } = portfolioSlice.actions;

export default portfolioSlice.reducer;
