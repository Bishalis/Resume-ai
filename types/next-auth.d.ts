import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "user" | "admin";
    };
  }

  interface User {
    role?: "user" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "user" | "admin";
  }
}
