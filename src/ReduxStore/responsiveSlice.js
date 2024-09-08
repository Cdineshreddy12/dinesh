// responsiveSlice.js
import { createSlice } from '@reduxjs/toolkit';

const responsiveSlice = createSlice({
  name: 'responsive',
  initialState: {
    isMobile: window.innerWidth < 768, // Initial value based on the current window width
  },
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = responsiveSlice.actions;
export default responsiveSlice.reducer;
