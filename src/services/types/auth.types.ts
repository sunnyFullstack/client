// src/services/types/auth.types.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface RegisterResponse {
  message: string;
  userId: string;
  username: string;
}
