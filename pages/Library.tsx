import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import PlaylistCard from "../components/PlaylistCard";
import spotifyApi from "@/lib/spotify";

const Library = ({ playlists }: { playlists: any[] }) => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center align-item-center mb-24">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            title={playlist.name}
            imageUrl={
              playlist.images[0]?.url || "https://via.placeholder.com/150"
            }
            playlistId={playlist.id}
          />
        ))}
      </div>
    </Layout>
  );
};
export default Library;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session?.accessToken) {
    return { redirect: { destination: "/api/auth/signin", permanent: false } };
  }

  // Set the access token on the Spotify API instance
  spotifyApi.setAccessToken(session.accessToken);

  const playlists = await spotifyApi.getUserPlaylists();
  return { props: { session, playlists: playlists.body.items } };
}
