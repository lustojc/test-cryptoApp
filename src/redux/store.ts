import { configureStore } from '@reduxjs/toolkit';
import coinSlice from './slices/coinSlice';

export const store = configureStore({
  reducer: {
    coinSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
