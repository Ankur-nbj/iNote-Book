import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // default mode
};

const stateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setMode } = stateSlice.actions;

export default stateSlice.reducer;
