import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendors: builder.query({
            query: () => ({
                url: "auth/admin/vendors/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["AllVendors"],
        }),
        addVendors: builder.mutation({
            query: ({data}) => ({
                url: "auth/admin/vendors/",
                method: "Post",
                headers: authHeader,
                body: {data}
            }),
            invalidatesTags: ["AllVendors"],
        }),
        editVendor: builder.mutation({
            query: ({id, ...data}) => ({
                url:`auth/admin/vendors/${id}`,
                method: "PATCH",
                headers: authHeader,
                body: {...data}
            }),
            invalidatesTags: ["AllVendors"],
        }),
        deleteVendor: builder.mutation({
            query: ({id, ...data}) => ({
                url: `auth/admin/vendors/${id}`,
                method: "DELETE",
                headers: authHeader,
                body: {...data}
            }),
            invalidatesTags: ["AllVendors"],
        }),

    }),
});

export const { useGetAllVendorsQuery, useAddVendorsMutation } = userSlice;
