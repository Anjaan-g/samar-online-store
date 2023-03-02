import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8888/api/v1/" }),
    tagTypes: ["Address", "OrderHistory", "MyReturns"],
    endpoints: (builder) => ({}),
});
