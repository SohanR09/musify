import React from "react";
import UserPlaylistCard from "./UserPlaylistCard";

const TopUserPlayLists = ({ userPlaylist }: { userPlaylist: any }) => {
  return (
    <div className="relative  mb-10">
      <div className="grid grid-cols-2 gap-4">
        {userPlaylist
          ?.slice(Math.max(userPlaylist.length - 8, 1))
          ?.map(
            ({
              id,
              name,
              artists,
              description,
              images,
              owner,
            }: {
              id: string;
              name: string;
              artists: any;
              description: any;
              images: any;
              owner: any;
            }) => {
              return (
                <UserPlaylistCard
                  key={id}
                  title={name}
                  imageUrl={images?.[0]?.url}
                  playlistId={id}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default TopUserPlayLists;
