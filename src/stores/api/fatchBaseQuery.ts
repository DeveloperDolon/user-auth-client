import { type FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TokenManager } from "../../utils/tokenManager";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (
        headers,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { arg }
    ) => {
        const token =
            typeof window !== "undefined" ? TokenManager.getToken() : null;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        const body = typeof arg === "object" && "body" in arg ? arg.body : null;
        if (!(body instanceof FormData)) {
            headers.set("Content-Type", "application/json");
        }
        return headers;
    },
    fetchFn: async (input, init) => {
        const response = await fetch(input, init);
        return response;
    },
});

export const baseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    (result?.error?.data as { message?: string })?.message ===
    "Unauthenticated."
  ) {
    console.log("Access token expired or invalid. Logging out...");

    TokenManager.removeToken();

    window.location.href = "/dashboard_login";
  }

  return result;
};
