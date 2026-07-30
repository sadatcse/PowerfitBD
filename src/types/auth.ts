import { type Role } from "@/constants/config";

/** The authenticated principal, decoded from the session JWT. */
export interface SessionUser {
  uid: string;
  email: string;
  name: string | null;
  picture: string | null;
  role: Role;
}

/** Claims stored inside the signed session cookie. */
export interface SessionClaims extends SessionUser {
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
