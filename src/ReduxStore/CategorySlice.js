// categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 'All Categories',
  categories: [
    "All Categories", "Electronics", "Fashion", "Home & Kitchen", 
    "Books", "Sports & Outdoors", "Beauty & Personal Care",
  ],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;