import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
    name: "vendor",
    initialState: { data: null },

    reducers: {
        setVendor: (state, action) => {
            state.data = action.payload;
        },
    },
});
export const { setVendor } = vendorSlice.actions;
export const vendorReducer = vendorSlice.reducer;

const categorySlice = createSlice({
    name: "category",
    initialState: {data: null},

    reducers: {
        setCategories: (state, action) => {
            state.data = action.payload
        }
    }
})