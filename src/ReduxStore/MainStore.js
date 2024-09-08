// store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './SisebarSlice';
import responsiveReducer from './responsiveSlice';
import categoryReducer from './CategorySlice';
import MobileCategorySlice from './MobileCategorySlice';
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    responsive: responsiveReducer,
    category: categoryReducer,
    MobileCategory : MobileCategorySlice
  }
});

export default store;
