import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";
import { REHYDRATE } from "redux-persist";


export const userDataSlice = apiSlice.injectEndpoints({
    // extractRehydrationInfo(action, {reducerPath}) {
    //     if (action.type === REHYDRATE) {
    //         return action.payload[reducerPath]
    //     }
    // },
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => ({
                url: "auth/user/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["OrderHistory"],
        }),
    }),
});

export const { useGetDataQuery } = userDataSlice;
