import { createSlice } from '@reduxjs/toolkit';

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
