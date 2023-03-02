import { createSlice } from "@reduxjs/toolkit";

const deliveryAddressSlice = createSlice({
    name: "deliveryAddress",
    initialState: {
        id: null,
        name: null,
        address: null,
        contact: null,
    },
    reducers: {
        selectAddress: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.address = action.payload.address;
            state.contact = action.payload.contact;
        },
        removeAddress: (state, token) => {
            state.id = null;
            state.name = null;
            state.address = null;
            state.contact = null;
        },
    },
});

export const { selectAddress, removeAddress } = deliveryAddressSlice.actions;

export const addressReducer = deliveryAddressSlice.reducer;
