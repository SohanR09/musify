import Layout from "@/components/Layout";
import spotifyApi from "@/lib/spotify";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const PlayList = ({
  session,
  user,
  userPlaylist,
}: {
  session: any;
  user: any;
  userPlaylist: any;
}) => {
  const accessToken = session?.accessToken;
  return (
    <Layout accessToken={accessToken} user={user?.display_name}>
      <div className="grid gap-3">
        Playlist section
        <Link className="bg-neutral-700 p-2 rounded-md w-32" href={"/"}>
          Back to Home
        </Link>
      </div>
      {/* Header Section  */}
      {/* Search PlayList and albums */}
      {/* Add Playlist */}
      {/* Playlist Crads  */}
      {/* album cards */}
    </Layout>
  );
};

export default PlayList;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session?.accessToken) {
    return { redirect: { destination: "/api/auth/signin", permanent: false } };
  }

  // Set the access token on the Spotify API instance
  spotifyApi.setAccessToken(session.accessToken);

  const user = await spotifyApi.getMe();
  const userPlaylist = await spotifyApi.getUserPlaylists();
  return {
    props: {
      session,
      user: user?.body,
      userPlaylist: userPlaylist?.body?.items,
    },
  };
}
