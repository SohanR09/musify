import Layout from "@/components/Layout";
import PlaylistTableView from "@/components/PlayListTableView";
import spotifyApi from "@/lib/spotify";
import { getPlaylistTracks } from "@/utils/api-spotify/GetPlatListTracks";
import { getSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const index = ({
  session,
  user,
  userPlaylist,
}: {
  session: any;
  user: any;
  userPlaylist: any;
}) => {
  const params = useParams();
  const playListId = params?.id?.[0];
  const accessToken = session?.accessToken;

  const [playListTracks, setPlayListTracks] = useState<any>();

  useEffect(() => {
    let tempTrakArray;
    if (accessToken && playListId) {
      getPlaylistTracks({ playListId, accessToken }).then((data) => {
        data?.length > 0 && setPlayListTracks(data);
      });
    }
  }, [accessToken]);

  const getPlayList = getPlayListDetails({ userPlaylist, playListId });

  return (
    <Layout accessToken={accessToken} user={user?.display_name}>
      {getPlayList && playListTracks && (
        <PlaylistTableView
          playlistTracks={playListTracks}
          playListDetails={getPlayListDetails({ userPlaylist, playListId })}
        />
      )}
    </Layout>
  );
};

export default index;

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

const getPlayListDetails = ({
  userPlaylist,
  playListId,
}: {
  userPlaylist: any;
  playListId: string;
}) => {
  let temp;
  userPlaylist?.length > 0 &&
    (temp = userPlaylist.filter(
      ({ id }: { id: string }) => id === playListId
    )?.[0]);
  return temp;
};
