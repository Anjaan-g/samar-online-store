import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "inventory/category/",
                method: "GET",
                headers: authHeader,
            }),
            providesTags: ["AllCategories"],
        }),
        addCategory: builder.mutation({
            query: ({ data }) => ({
                url: "inventory/category/",
                method: "Post",
                headers: authHeader,
                body: { data },
            }),
            invalidatesTags: ["AllCategories"],
        }),
        editCategory: builder.mutation({
            query: ({ ...data }) => ({
                url: `inventory/category/${id}`,
                method: "PATCH",
                headers: authHeader,
                body: { ...data },
            }),
            invalidatesTags: ["AllCategories"],
        }),
        deleteCategory: builder.mutation({
            query: ({ ...data }) => ({
                url: `inventory/category/${id}`,
                method: "PATCH",
                headers: authHeader,
                body: { ...data },
            }),
            invalidatesTags: ["AllCategories"],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
} = userSlice;
