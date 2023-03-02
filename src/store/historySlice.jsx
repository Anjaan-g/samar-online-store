import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userHistorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHistory: builder.query({
            query: () => ({
                url: "auth/user/order-history/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["MyReturns"],
        }),
    }),
});

export const { useGetHistoryQuery } = userHistorySlice;
