import { Method } from "./../../node_modules/@babel/types/lib/index-legacy.d";
// src/services/auth.api.ts
import { api } from "./api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types/auth.types";

export const userApi: any = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation<any, void>({
      query: () => ({
        url: "/v1/getusers",
        method: "GET",
        credentials: "include", // ✅ include cookies in request
      }),
    }),
  }),
});
export const { useGetUsersMutation } = userApi;
