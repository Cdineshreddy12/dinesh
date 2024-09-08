// slice.js
import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    side: false
  },
  reducers: {
    toggleSide(state) {
      state.side = !state.side;
    }
  }
});

export const { toggleSide } = sidebarSlice.actions;
export default sidebarSlice.reducer;
