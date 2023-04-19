import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";
import { REHYDRATE } from "redux-persist";


export const userDataSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => ({
                url: "auth/user/",
                method: "GET",
                headers: authHeader,
            }),
            keepUnusedDataFor: 5,
            providesTags: ["OrderHistory"],
        }),
    }),
});

export const { useGetDataQuery } = userDataSlice;
