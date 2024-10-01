export async function getPlaylistTracks({
  playListId,
  accessToken,
}: {
  playListId: string;
  accessToken: string;
}) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await response.json();

  if (data?.items?.length > 0) return data?.items; // This contains the tracks
}
