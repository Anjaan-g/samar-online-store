import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    // tagTypes: ["Address", "OrderHistory", "MyReturns", "CartItems"],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({}),
});
