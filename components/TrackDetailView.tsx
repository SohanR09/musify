import capitalizeFirstLetter from "@/utils/functions/Captilizer";
import convertMillisToMinSec from "@/utils/functions/ConvertMilllitoSec";
import { generateGradient } from "@/utils/functions/GenerateGradient";
import IconArrowBackOutline from "@/utils/svg-icons/IconBackward";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import IconPlayFill from "@/utils/svg-icons/IconPlayFilled";

const TrackDetailView = ({ trackData }: { trackData: any }) => {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    const GenrateGradient = async () => {
      try {
        let gradientClass: any = await generateGradient(
          trackData?.album?.images?.[0]?.url
        );
        setGradient(gradientClass);
      } catch (error) {}
    };

    if (trackData?.album?.images?.[0]?.url) GenrateGradient();
  }, [trackData?.album?.images?.[0]?.url]);

  const artistsName = trackData?.artists
    ?.map(({ name }: { name: string }) => name)
    .join(", ");
  return (
    <div className="noscrollbar">
      {" "}
      <div
        className={`flex md:flex-row flex-col items-center mb-8  p-8 shadow-none`}
        style={{
          background: `${gradient}`,
        }}
      >
        <Link href={"/"} className="w-full -left-20 md:hidden">
          <IconArrowBackOutline className="w-9 h-9" />
        </Link>
        <div className="md:w-56 md:h-56 w-40 h-40 overflow-hidden rounded-md shadow-md relative">
          <img
            src={trackData?.album?.images?.[0]?.url}
            alt="Playlist Cover"
            className="md:w-56 md:h-56 w-40 h-40 z-0"
          />
        </div>
        <div className="flex flex-col md:ml-3 items-start mt-2 h-[10rem] justify-between">
          <span className="font-normal ml-1">
            {/* {capitalizeFirstLetter(trackData?.type)} */}
            Song
          </span>
          <h1 className="md:text-6xl text-xl font-bold mt-4 mb-4">
            {trackData?.name}
          </h1>
          <div className="mt-2 text-sm ml-1">
            {/* <span>Playlist</span> •{" "} */}
            <span className="font-semibold">{artistsName}</span> •{" "}
            <span>
              {moment(trackData?.album?.release_date).format("YYYY")}{" "}
            </span>{" "}
            •{" "}
            <span>
              {convertMillisToMinSec(trackData?.duration_ms)}
              {/* , about{" "}
              {Math.round(playListDetails?.duration / 60)} min */}
            </span>
          </div>
        </div>
      </div>
      {/* Control Section */}
      <div className="flex justify-end md:justify-start gap-4 mb-4 px-4 w-full">
        <Button
          className="bg-green-500 text-black w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-400 transition duration-300 ease-in-out hover:scale-110"
          onClick={() => {
            window.sessionStorage.setItem("playerId", trackData?.id); // Dispatch a custom event to notify the player component
            window.dispatchEvent(new Event("trackIdUpdated"));
          }}
        >
          <IconPlayFill className="w-8 h-8" fill="black" />
        </Button>
      </div>
    </div>
  );
};

export default TrackDetailView;
