// // src/services/api.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5001/api",
//     credentials: "include",
//   }),
//   endpoints: () => ({}),
// });

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandler } from "./baseQueryWithErrorHandler";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandler,
  endpoints: () => ({}),
});
