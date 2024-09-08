import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mobileMenuIsOpen:false,
    mobileActiveCategory :'All Categories',
    categories: [
      "All Categories", "Electronics", "Fashion", "Home & Kitchen", 
      "Books", "Sports & Outdoors", "Beauty & Personal Care",
    ],
}

const MobileCategorySlice = createSlice({
    name:'mobileMenuCategories',
    initialState:initialState,
    reducers:{
        MobileMenu(state)
        {
           state.mobileMenuIsOpen=!state.mobileMenuIsOpen
        },
    }
});

export const  {MobileMenu, MobileCategory}=MobileCategorySlice.actions;
export default MobileCategorySlice.reducer;