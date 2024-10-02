export default async function GetVolume({
  accessToken,
  volume,
}: {
  accessToken: string;
  volume: any;
}) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${
        volume * 100
      }`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch volume");
    }

    const data = await response.json();
    return data;
  } catch (error) {}
}
