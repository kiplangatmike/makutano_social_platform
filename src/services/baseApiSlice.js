import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V1,
  credentials: "include",
});

export const baseApiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
    editPost: builder.mutation({
      query: (id, body) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
    likePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/posts/interactions/like?id=${postId}&userId=${userId}`,
        method: "POST",
      }),
    }),
    unlikePost: builder.mutation({
      query: ({ userId, postId }) => ({
        url: `/posts/interactions/unlike?id=${postId}&userId=${userId}`,
        method: "POST",
      }),
    }),
    getPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    getPostsByUserId: builder.query({
      query: (id) => ({
        url: `/posts/user/${id}`,
        method: "GET",
      }),
    }),
    commentPost: builder.mutation({
      query: (body) => ({
        url: `/posts/interactions/comment`,
        method: "POST",
        body,
      }),
    }),
    getCommentsCount: builder.query({
      query: (id) => ({
        url: `/posts/interactions/comment?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useEditPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useCommentPostMutation,
  useGetCommentsCountQuery,
} = baseApiSlice;
