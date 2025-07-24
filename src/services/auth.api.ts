// src/services/auth.api.ts
import { api } from "./api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types/auth.types";

export const authApi: any = api.injectEndpoints({
  endpoints: (builder) => ({
    profileEdit: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "auth/profileedit",
        method: "PUT",
        body: body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query<{ name: string; email: string }, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
        credentials: "include", // ✅ include cookies in request
      }),
    }),
    logout: builder.mutation<{}, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
        credentials: "include", // ✅ include cookies in request
      }),
    }),
  }),
});

export const {
  useProfileEditMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
