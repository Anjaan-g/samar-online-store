import { apiSlice } from "./apiSlice";
import authHeader from "../services/auth-header";

export const bannerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query({
            query: () => ({
                url: "inventory/banner/",
                method: "GET",
            }),
            providesTags: ["Banners"],
        }),
        addBanner: builder.mutation({
            query: ({ name, image, url }) => ({
                url: "inventory/banner/",
                method: "POST",
                headers: authHeader,
                body: { name: name, image: image, url: url },
            }),
            invalidatesTags: ["Banners"],
        }),
        editBanner: builder.mutation({
            query: ({ id, name, image, url }) => ({
                url: `inventory/banner/${id}`,
                method: "PATCH",
                headers: authHeader,
                body: { name: name, image: image, url: url },
            }),
            invalidatesTags: ["Banners"],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `inventory/banner/${id}`,
                method: "DELETE",
                headers: authHeader,
            }),
            invalidatesTags: ["Banners"],
        }),
    }),
});

export const {
    useGetBannersQuery,
    useAddBannerMutation,
    useEditBannerMutation,
    useDeleteBannerMutation,
} = bannerSlice;
