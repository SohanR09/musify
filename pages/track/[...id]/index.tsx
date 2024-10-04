import Layout from "@/components/Layout";
import TrackDetailView from "@/components/TrackDetailView";
import spotifyApi from "@/lib/spotify";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TrackDetails = ({
  session,
  user,
  userPlaylist,
}: {
  session: any;
  user: any;
  userPlaylist: any;
}) => {
  const params = useParams();
  const trackId = params?.id?.[0];
  const accessToken = session?.accessToken;

  const [trackData, setTrackData] = useState();

  useEffect(() => {
    let trackDetails;
    if (userPlaylist && trackId) {
      trackDetails = userPlaylist?.filter(
        ({ id }: { id: string }) => id === trackId
      );
    }
    trackDetails?.[0] && setTrackData(trackDetails?.[0]);
  }, [userPlaylist, trackId]);

  return (
    <Layout accessToken={accessToken} user={user?.display_name}>
      <TrackDetailView trackData={trackData}></TrackDetailView>
    </Layout>
  );
};

export default TrackDetails;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session?.accessToken) {
    return { redirect: { destination: "/api/auth/signin", permanent: false } };
  }

  // Set the access token on the Spotify API instance
  spotifyApi.setAccessToken(session.accessToken);

  const user = await spotifyApi.getMe();
  const userPlaylist = await spotifyApi.getMyTopTracks();
  return {
    props: {
      session,
      user: user?.body,
      userPlaylist: userPlaylist?.body?.items,
    },
  };
}
