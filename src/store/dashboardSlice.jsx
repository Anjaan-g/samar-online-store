import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const dashboardSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => ({
                url: "inventory/dashboard",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["Dashboard"]
        })
    })
})

export const {useGetDashboardQuery} = dashboardSlice;