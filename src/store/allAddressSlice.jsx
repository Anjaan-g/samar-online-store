import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../services/axios";
import authHeader from "../services/auth-header";

export const getAddress = createAsyncThunk("user/address", async () => {
    const response = await api.get(
        "auth/user/address",
        (headers = authHeader)
    );
    console.log(response.data)
    return response.data;
});

const allAddressSlice = createSlice({
    name: "addressList",
    initialState: { data: [], error: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddress.pending, (state, action) => {
            if (state.loading === "idle") {
                state.loading = "pending";
            }
        });
        builder.addCase(getAddress.fulfilled, (state, action) => {
            if (state.loading === "pending") {
                state.data = action.payload;
                state.loading = "idle";
            }
        });
        builder.addCase(getAddress.rejected, (state, action) => {
            if (state.loading === "pending") {
                state.loading = "idle";
                state.error = "Some Error Occured";
            }
        });
    },
});

export const selectAllAddress = (state) => state.addressList;

export const selectAddressById = (state, addressId) =>
    state.addressList.find((address) => address.id === addressId);

export const allAddressReducer = allAddressSlice.reducer;
