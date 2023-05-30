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

        getProduct: builder.query({
            query: ({ id }) => ({
                url: `inventory/product/${id}`,
                method: "GET",
            }),
            providesTags: ["ProductDetail"],
        }),

        listImages: builder.mutation({
            query: (id) => ({
                url: `inventory/product/${id}/list_images/`,
                method: "GET",
                headers: authHeader,
            }),
            invalidatesTags: ["Products"],
        }),

        addImages: builder.mutation({
            query: (id, images) => ({
                url: `inventory/product/${id}/upload_images/`,
                method: "POST",
                body: { images: images },
                headers: authHeader,
            }),
            invalidatesTags: ["Products"],
        }),

        deleteImage: builder.mutation({
            query: (id) => ({
                url: `inventory/admin/product/images/${id}/`,
                method: "DELETE",
                // body: { images: images },
                headers: authHeader,
            }),
            invalidatesTags: ["Products"],
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
                highlights,
                description,
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
                    description: description,
                    highlights: highlights,
                    images: images,
                },
                headers: authHeader,
            }),
            invalidatesTags: ["Products"],
        }),

        editProduct: builder.mutation({
            query: ({
                id,
                name,
                buyPrice,
                sellPrice,
                stock,
                warranty,
                status,
                category,
                images,
                description,
                highlights,
            }) => ({
                url: `inventory/product/${id}`,
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
                    description: description,
                    highlights: highlights,
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
    useGetProductQuery,
    useEditProductMutation,
    useListImagesMutation,
    useAddImagesMutation,
    useDeleteImageMutation,
    useAddProductsMutation,
    useDeleteProductMutation,
} = productSlice;
