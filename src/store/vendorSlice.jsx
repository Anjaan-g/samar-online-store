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
            query: ({
                name,
                contactPerson,
                email,
                phone,
                address,
                contactNo,
            }) => ({
                url: "auth/admin/vendors/",
                method: "Post",
                headers: authHeader,
                body: {
                    name: name,
                    contact_person: contactPerson,
                    email: email,
                    phone: phone,
                    address: address,
                    contact_no: contactNo,
                },
            }),
            invalidatesTags: ["AllVendors"],
        }),
        editVendor: builder.mutation({
            query: ({
                id,
                name,
                contactPerson,
                email,
                phone,
                address,
                contactNo,
            }) => ({
                url: `auth/admin/vendors/${id}/`,
                method: "PATCH",
                headers: authHeader,
                body: {
                    name: name,
                    contact_person: contactPerson,
                    email: email,
                    address: address,
                    contact_no: contactNo,
                },
            }),
            invalidatesTags: ["AllVendors"],
        }),
        deleteVendor: builder.mutation({
            query: ({ id }) => ({
                url: `auth/admin/vendors/${id}/`,
                method: "DELETE",
                headers: authHeader,
            }),
            invalidatesTags: ["AllVendors"],
        }),
    }),
});

export const {
    useGetAllVendorsQuery,
    useAddVendorsMutation,
    useEditVendorMutation,
    useDeleteVendorMutation,
} = userSlice;
