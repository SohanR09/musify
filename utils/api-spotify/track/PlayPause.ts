import { NextApiRequest, NextApiResponse } from "next";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/me/player";

export default async function GetPlayPause({
  accessToken,
  method,
  playerId,
}: {
  accessToken: string;
  method: string;
  playerId: string;
}) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/${method}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          uris: [`spotify:track:${playerId}`], // Spotify URI for the track
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch playlists");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {}
}
