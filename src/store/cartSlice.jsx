import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { data: null },

    reducers: {
        setCart: (state, action) => {
            state.data = action.payload;
        },

        addToCart: (state, action) => {
            const itemInCart = state.data.find(
                (item) => item.product_id === action.payload.product_id
            );
            if (itemInCart) {
                if (itemInCart.stock > itemInCart.qty) {
                    itemInCart.qty++;
                }
            } else {
                state.data.push({ ...action.payload, qty: 1 });
            }
        },

        incrementQuantity: (state, action) => {
            const item = state.data.find(
                (item) => item.product_id === action.payload
            );
            if (item.stock > item.qty) {
                item.qty++;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.data.find(
                (item) => item.product_id === action.payload
            );
            if (item.qty === 1) {
                item.qty = 1;
            } else {
                item.qty--;
            }
        },

        removeItem: (state, action) => {
            const removeItem = state.data.filter(
                (item) => item.product_id !== action.payload
            );
            if (window.confirm("Are you sure you want to remove this item?")) {
                state.data = removeItem;
            }
        },
    },
});

export const {
    setCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
