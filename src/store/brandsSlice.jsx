import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrands: builder.query({
            query: () => ({
                url: "inventory/brands/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["AllBrands"],
        }),
        addBrand: builder.mutation({
            query: ({ data }) => ({
                url: "inventory/brands/",
                method: "POST",
                headers: authHeader,
                body: { data },
            }),
            invalidatesTags: ["AllBrands"],
        }),
        editBrand: builder.mutation({
            query: ({ id, ...data }) => ({
                url: "inventory/brands/",
                method: "PATCH",
                headers: authHeader,
                body: { ...data },
            }),
            invalidatesTags: ["AllBrands"],
        }),
        deleteBrand: builder.mutation({
            query: ({ id, ...data }) => ({
                url: "inventory/brands/",
                method: "DELETE",
                headers: authHeader,
                body: { ...data },
            }),
            invalidatesTags: ["AllBrands"],
        }),
    }),
});

export const {
    useGetAllBrandsQuery,
    useAddBrandMutation,
    useEditBrandMutation,
    useDeleteBrandMutation,
} = userSlice;
