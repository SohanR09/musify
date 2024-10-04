import { getPlaylistTracks } from "@/utils/api-spotify/GetPlatListTracks";
import IconNextCircle from "@/utils/svg-icons/IconNext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import NextTrack from "@/utils/functions/NextTrack";
import IconSkipPrevious from "@/utils/svg-icons/IconPRevious";
import PreviousTrack from "@/utils/functions/PreviousTrack";

const Player = ({ accessToken }: { accessToken: any }) => {
  const params = useParams();
  const playListId = params?.id?.[0];
  const [trackId, setTrackId] = useState<string>("");
  const [playListArray, setPlayListArray] = useState();

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

  useEffect(() => {
    if (accessToken && playListId) {
      getPlaylistTracks({ accessToken, playListId }).then((data: any) => {
        setPlayListArray(data);
      });
    }
  }, [accessToken, playListId]);

  console.log(playListId);

  return (
    <div className="spotify-player w-full sticky bottom-0 pb-5 px-2  md:bottom-2 left-64 right-0 md:h-20 h-50 bg-neutral-950 bg-opacity-80 z-10">
      {trackId === "" ? (
        <div className="w-full h-full flex justify-center items-center text-xl">
          Select a song!
        </div>
      ) : (
        <div
          className={`flex flex-col md:flex-row h-full ${
            playListId === "" || typeof playListId === "undefined"
              ? "justify-center"
              : "md:justify-start justify-center items-center gap-5"
          }`}
        >
          <iframe
            // style={{border-radius:"12px"}}
            src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
            className="md:w-[80%] w-[100%]"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>

          <div
            className={`md:w-[20%] w-full flex justify-center items-center ${
              playListId === "" || typeof playListId === "undefined"
                ? "hidden"
                : ""
            }`}
          >
            <Button
              className="bg-transparent hover:bg-transparent"
              onClick={() => {
                PreviousTrack({ playListArray, trackId });
              }}
            >
              <IconSkipPrevious width={"3rem"} className="cursor-pointer" />
            </Button>
            <Button
              className="bg-transparent hover:bg-transparent"
              onClick={() => {
                NextTrack({ playListArray, trackId });
              }}
            >
              <IconNextCircle width={"3rem"} className="cursor-pointer" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
