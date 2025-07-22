import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api",
  credentials: "include",
});

export const baseQueryWithErrorHandler: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    // ❗️Store error in Redux or Zustand, or trigger a callback
    console.error("Global API Error:", result.error);
    // You could also broadcast to a custom Event or store
  }

  return result;
};
