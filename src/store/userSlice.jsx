import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "auth/admin/users/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["AllUsers"],
        }),
        getAllAdmins: builder.query({
            query: () => ({
                url: "auth/admin/admins/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["AllAdmins"],
        }),
        addAdmin: builder.mutation({
            query: ({data}) => ({
                url: "auth/admin/admins/",
                method: "GET",
                headers: authHeader,
                body: {data}
            }),
            invalidatesTags: ["AllAdmins"],
        }),
    }),
});

export const { useGetAllUsersQuery, useGetAllAdminsQuery, useAddAdminMutation } = userSlice;
