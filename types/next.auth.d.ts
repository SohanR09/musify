import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add accessToken as optional
    error?: string; // Optional error field for token refresh issues
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number; // Custom expiration field
    error?: string;
  }
}
