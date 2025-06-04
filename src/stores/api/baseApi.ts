import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./fatchBaseQuery";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ["auth", "product", "role", "brand", "review", "order", "user"],
});