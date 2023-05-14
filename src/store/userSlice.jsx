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
            query: ({
                firstName,
                lastName,
                email,
                phoneNo,
                vendor,
                password,
            }) => ({
                url: "auth/admin/admins/",
                method: "POST",
                headers: authHeader,
                body: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_no: phoneNo,
                    vendor: vendor,
                    password: password,
                },
            }),
            invalidatesTags: ["AllAdmins"],
        }),
        updateAdmin: builder.mutation({
            query: ({
                id,
                firstName,
                lastName,
                email,
                phoneNo,
                vendor,
            }) => ({
                url: `auth/admin/admins/${id}/`,
                method: "PATCH",
                headers: authHeader,
                body: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_no: phoneNo,
                    vendor: vendor
                }
            }),
            invalidatesTags: ["AllAdmins"]
        })
    }),
});

export const {
    useGetAllUsersQuery,
    useGetAllAdminsQuery,
    useAddAdminMutation,
    useUpdateAdminMutation,
} = userSlice;
