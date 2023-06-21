import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userHistorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllHistory: builder.query({
            query: () => ({
                url: "auth/user/order-history/",
                method: "GET",
                headers: authHeader,
            }),
            // keepUnusedDataFor: 5,
            providesTags: ["MyOrders"],
        }),

        getHistory: builder.query({
            query: ({ unique_id }) => ({
                url: `auth/user/order?unique_id=${unique_id}`,
                method: "GET",
                headers: authHeader,
            }),
            // keepUnusedDataFor: 60,
            providesTags: ["Order"],
        }),

        addHistory: builder.mutation({
            query: ({ items, deliveryCharge, paid, source }) => ({
                url: `auth/user/order-history/`,
                method: "POST",
                headers: authHeader,
                body: {
                    history_items: items,
                    delivery_charge: deliveryCharge,
                    paid: paid,
                    source: source,
                },
            }),
            invalidatesTags: ["MyOrders"],
        }),
    }),
});

export const {
    useGetAllHistoryQuery,
    useAddHistoryMutation,
    useGetHistoryQuery,
} = userHistorySlice;
