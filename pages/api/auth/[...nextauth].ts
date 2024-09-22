import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"; // Your spotifyApi instance

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-library-read",
  "streaming",
  "playlist-read-private",
].join(",");

// Helper function to refresh the access token
async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // Expires in 1 hour
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Fallback to old refresh token if Spotify doesn't return a new one
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // This is called when the JWT is first created or when the session is refreshed
    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          token_type: account.token_type,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000, // Check if expires_at is defined, fallback to 1 hour if not
          user,
        };
      }

      // Return the token if it's still valid
      if (Date.now() < (account?.expires_at || 0)) {
        return token;
      }

      // Access token has expired, refresh it
      return await refreshAccessToken(token);
    },

    // This is called when the session is checked (e.g., on page load)
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any; // Attach accessToken to session
      session.user = user as any;

      return session;
    },
  },
});
