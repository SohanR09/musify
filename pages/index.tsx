// pages/index.tsx
import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import spotifyApi from "@/lib/spotify";
import NewReleases from "@/components/NewReleases";
import RecentlyPlayedTracks from "@/components/RecentlyPlayedTracks";
import UserPlayLists from "@/components/UserPlayLists";
import { useEffect } from "react";
import TopUserPlayLists from "@/components/TopUserPlayLists";

const Home = ({
  session,
  user,
  newReleases,
  recentlyPlayedTracks,
  userPlaylist,
}: // featuredPlaylist,
{
  session: any;
  user: any;
  newReleases: any;
  recentlyPlayedTracks: any;
  userPlaylist: any;
  // featuredPlaylist: any;
}) => {
  useEffect(() => {
    let userData;
    if (user) {
      userData = {
        userName: user?.display_name,
        email: user?.email,
        imageUrl: user?.images?.[0]?.url,
      };
    } else {
      userData = { userName: "", imageUrl: "", email: "" };
    }
    if (userData)
      window.sessionStorage.setItem("userData", JSON.stringify(userData));
  }, [user]);

  return (
    <Layout accessToken={session?.accessToken} user={user?.display_name}>
      <div className=" py-1 md:px-8 mb-20 pt-2 p-4 md:p-6">
        {/* Top User Playlists */}
        <TopUserPlayLists userPlaylist={userPlaylist} />
        {/* New Releases Section */}
        <NewReleases newReleases={newReleases} />
        {/* Top Tracks Section */}
        <RecentlyPlayedTracks recentlyPlayedTracks={recentlyPlayedTracks} />
        {/* User playlist Section */}
        <UserPlayLists
          userName={user?.display_name}
          userPlaylist={userPlaylist}
        />
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session?.accessToken) {
    return { redirect: { destination: "/api/auth/signin", permanent: false } };
  }

  // Set the access token on the Spotify API instance
  spotifyApi.setAccessToken(session.accessToken);

  const user = await spotifyApi.getMe();
  const newReleases = await spotifyApi.getNewReleases();
  const recentlyPlayedTracks = await spotifyApi.getMyRecentlyPlayedTracks();
  const userPlaylist = await spotifyApi.getUserPlaylists();
  // const featuredPlaylist = await spotifyApi.get
  return {
    props: {
      session,
      user: user?.body,
      newReleases: newReleases?.body?.albums?.items,
      recentlyPlayedTracks: recentlyPlayedTracks?.body?.items,
      userPlaylist: userPlaylist?.body?.items,
      // featuredPlaylist: featuredPlaylist?.body?.items,
    },
  };
}
