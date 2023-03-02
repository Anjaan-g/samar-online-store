import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userReturnsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReturns: builder.query({
            query: () => ({
                url: "auth/user/history?status=returned",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["OrderHistory"],
        }),
    }),
});

export const { useGetReturnsQuery } = userReturnsSlice;
