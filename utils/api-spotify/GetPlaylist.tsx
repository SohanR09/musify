// This file handles all Spotify API interactions

export const getPlaylists = async (accessToken: string) => {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await res.json();
  return data.items; // Returns an array of playlists
};
