import authHeader from "../services/auth-header";
import { apiSlice } from "./apiSlice";

export const usersAddressSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAddress: builder.query({
            query: () => ({
                url:"auth/user/address/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["Address"],
        }),
        addAddress: builder.mutation({
            query: ({contactPerson, address, phoneNo, tag, isdefault}) => ({
                url: "auth/user/address/",
                method: "POST",
                body: {contact_person:contactPerson, address:address, phone_no:phoneNo, tag:tag, default:isdefault},
                headers: authHeader,
            }),
            invalidatesTags: ["Address"],
        }),
        updateAddress: builder.mutation({
            query: ({ id, contactPerson, address, phoneNo, tag, isdefault }) => ({
                url: `auth/user/address/${id}/`,
                method: "PATCH",
                body: {contact_person:contactPerson, address:address, phone_no:phoneNo, tag:tag, default:isdefault},
                headers: authHeader,
            }),
            invalidatesTags: ["Address"],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `auth/user/address/${id}`,
                method: "Delete",
                headers: authHeader,
            }),
            invalidatesTags: ["Address"],
        }),
    }),
});

export const { useGetAddressQuery, useAddAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } = usersAddressSlice;
