import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: "inventory/product/",
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
        addProducts: builder.mutation({
            query: ({
                name,
                buyPrice,
                sellPrice,
                stock,
                warranty,
                status,
                category,
                images,
            }) => ({
                url: "inventory/product/",
                method: "POST",
                body: {
                    name: name,
                    buy_price: buyPrice,
                    sell_price: sellPrice,
                    stock: stock,
                    warranty: warranty,
                    status: status,
                    category: category,
                    images: images,
                },
                headers: authHeader,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `inventory/product/${id}`,
                method: "DELETE",
                headers: authHeader,
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useAddProductsMutation,
    useDeleteProductMutation,
} = productSlice;
