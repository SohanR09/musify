import React, { useRef } from "react";
import PlaylistCard from "./PlaylistCard";

const UserPlayLists = ({
  userName,
  userPlaylist,
}: {
  userName: string;
  userPlaylist: any;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative mt-9">
      <h2 className="text-xl font-semibold text-white mb-4">Your playlists</h2>

      {/* Scroll buttons */}
      {/* <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 p-2 rounded-full z-10 hidden md:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 p-2 rounded-full z-10 hidden md:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button> */}

      {/* Cards Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden space-x-4 scrollbar-hide scroll-smooth"
      >
        {/* Playlist Cards */}
        {userPlaylist?.map(
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
              <div
                className={`${
                  userName === owner?.display_name ? "" : "hidden"
                } `}
                key={id}
              >
                {" "}
                <PlaylistCard
                  title={name}
                  imageUrl={images?.[0]?.url}
                  description={
                    description === "" ? `By ${userName}` : description
                  }
                  playlistId={id}
                />
              </div>
            );
          }
        )}

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default UserPlayLists;
