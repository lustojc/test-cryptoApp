import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getPortfolioFromLS } from '../../utils/getPortfolioFromLS';

export interface items {
  items: any[];
  totalPrice: number;
}

const { items, totalPrice } = getPortfolioFromLS();

const initialState: items = {
  items,
  totalPrice,
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

export const { addItems, removeItem } = portfolioSlice.actions;

export default portfolioSlice.reducer;
