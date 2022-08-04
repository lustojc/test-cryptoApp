import { configureStore } from '@reduxjs/toolkit';

import coinSlice from './slices/coinSlice';
import portfolioSlice from './slices/portfolioSlice';
import choosenCoinSlice from './slices/chosenCoinSlice';

export const store = configureStore({
  reducer: {
    coinSlice,
    portfolioSlice,
    choosenCoinSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
