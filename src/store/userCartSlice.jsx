import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import authHeader from "../services/auth-header";
import { apiSlice } from "./apiSlice";

export const userCartSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => ({
                url: "/auth/user/cart/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["CartItems"],
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: "/auth/user/cart/create/",
                method: "POST",
                headers: authHeader,
                body: { data },
            }),
            invalidatesTags: ["CartItems"],
        }),
    }),
});

export const { useGetCartItemsQuery, useUpdateCartMutation } = userCartSlice;
