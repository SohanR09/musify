import React, { useEffect, useState } from "react";

const Player = ({ accessToken }: { accessToken: any }) => {
  const [trackId, setTrackId] = useState("");
  useEffect(() => {
    // Listen for the custom event when trackId is updated
    const handleTrackIdUpdate = () => {
      const trackId = window?.sessionStorage?.getItem("playerId");
      trackId && setTrackId(trackId as string);
    };

    // Add event listener for the custom event
    window.addEventListener("trackIdUpdated", handleTrackIdUpdate);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("trackIdUpdated", handleTrackIdUpdate);
    };
  });

  return (
    <div className="spotify-player w-full sticky bottom-1 px-2  md:bottom-2 left-64 right-0 h-20 bg-neutral-950 bg-opacity-80 flex justify-center z-10">
      {trackId === "" ? (
        <div className="w-full h-full flex justify-center items-center text-xl">
          Select a song!
        </div>
      ) : (
        <iframe
          // style={{border-radius:"12px"}}
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
          className="md:w-[80%] w-[100%]"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

export default Player;
