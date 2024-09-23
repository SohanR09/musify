import React, { useRef } from "react";
import PlaylistCard from "../components/PlaylistCard";

const NewReleases = ({ newReleases }: { newReleases: any }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 100, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative">
      <h2 className="text-xl font-semibold text-white mb-4">New Releases</h2>

      {/* Scroll buttons */}
      <button
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
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Cards Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll space-x-4 scrollbar-hide scroll-smooth"
      >
        {/* Playlist Cards */}
        {newReleases?.map(
          ({
            id,
            name,
            artists,
            images,
          }: {
            id: string;
            name: string;
            artists: any;
            images: any;
          }) => {
            let artistsArray;
            artistsArray = Array.isArray(artists)
              ? artists
                  ?.map((artist: any) => {
                    return name;
                  })
                  .join(", ")
              : "none";
            return (
              <PlaylistCard
                key={id}
                title={name}
                imageUrl={images?.[0]?.url}
                description={artists?.[0]?.name}
                playlistId={id}
              />
            );
          }
        )}

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default NewReleases;
