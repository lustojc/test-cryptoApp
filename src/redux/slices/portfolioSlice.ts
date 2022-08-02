import { createSlice } from '@reduxjs/toolkit';

interface items {
  items: any[];
  totalPrice: number;
}

interface coinObj {
  count: number;
  price: number;
  tittle: string;
  id: number;
}

const initialState: items = {
  items: [],
  totalPrice: 0,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addItems(state: items, action) {
      const findItem = state.items.find((obj) => obj.id == action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum: any, obj: coinObj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
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
