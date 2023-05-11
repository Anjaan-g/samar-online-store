import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const brandsSlice = apiSlice.injectEndpoints({
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
            query: ({ name }) => ({
                url: "inventory/brands/",
                method: "POST",
                headers: authHeader,
                body: { name },
            }),
            invalidatesTags: ["AllBrands"],
        }),
        editBrand: builder.mutation({
            query: ({ id, name }) => ({
                url: `inventory/brands/${id}/`,
                method: "PATCH",
                headers: authHeader,
                body: { name },
            }),
            invalidatesTags: ["AllBrands"],
        }),
        deleteBrand: builder.mutation({
            query: ({ id }) => ({
                url: `inventory/brands/${id}/`,
                method: "DELETE",
                headers: authHeader,
                // body: { ...data },
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
} = brandsSlice;
