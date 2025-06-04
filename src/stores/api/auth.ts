import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    me: builder.query({
      query: () => "/auth/me",
      providesTags: ['User'],
    }),
    verifyToken: builder.query({
      query: () => '/auth/verify',
      providesTags: ['User'],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useMeQuery, useLazyVerifyTokenQuery } = authApi;
