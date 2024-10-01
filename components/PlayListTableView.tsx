import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlayIcon, MoreVertical, Pencil, X } from "lucide-react";
import IconPlayFill from "@/utils/svg-icons/IconPlayFilled";
import IconDuration from "@/utils/svg-icons/IconDuration";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function capitalizeFirstLetter(string: string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

function convertMillisToMinSec(millis: number): string {
  const minutes = Math.floor(millis / 60000); // Convert to minutes
  const seconds = Math.floor((millis % 60000) / 1000); // Get remaining seconds

  // Pad single-digit seconds with leading zero
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${paddedSeconds}`;
}

const PlaylistTableView = ({
  playlistTracks,
  playListDetails,
}: {
  playlistTracks: any;
  playListDetails: any;
}) => {
  // flag
  let count = 0;

  const [name, setName] = useState<string | any>("");
  const [description, setDescription] = useState("");

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  console.log(playListDetails);
  useEffect(() => {
    playListDetails?.name?.length > 0 && setName(playListDetails?.name);
    playListDetails?.description?.length > 0 &&
      setName(playListDetails?.description);
  }, [playListDetails]);

  return (
    <div className="  text-white mb-8">
      {/* Playlist Header */}
      <div className="flex md:flex-row flex-col items-center mb-8 bg-gradient-to-t from-neutral-500 to-neutral-800 p-8 shadow-none">
        <div
          className="md:w-56 md:h-56 w-40 h-40 overflow-hidden rounded-md shadow-md relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={playListDetails?.images?.[0]?.url}
            alt="Playlist Cover"
            className="md:w-56 md:h-56 w-40 h-40 z-0"
          />
          {/* Pencil Icon on hover */}
          {isHovered && (
            <div
              onClick={handleModalOpen}
              className="md:w-56 md:h-56 w-40 h-40 absolute p-2 bg-black/70 rounded-sm cursor-pointer z-1 top-0 flex flex-col justify-center items-center"
            >
              <Pencil className="text-whitez" size={50} />
              <span>Choose Photo</span>
            </div>
          )}
        </div>
        <div className="ml-6">
          <span className="font-normal">
            {capitalizeFirstLetter(playListDetails?.type)}
          </span>
          <h1 className="text-6xl font-bold">{playListDetails?.name}</h1>
          <div className="mt-2 text-lg">
            {/* <span>Playlist</span> •{" "} */}
            <span className="font-semibold">
              {playListDetails?.owner?.display_name}
            </span>{" "}
            •{" "}
            <span>
              {playListDetails?.tracks.total} songs
              {/* , about{" "}
              {Math.round(playListDetails?.duration / 60)} min */}
            </span>
          </div>
        </div>
      </div>

      {/* Control Section */}
      <div className="flex items-center gap-4 mb-4 px-4">
        <Button className="bg-green-500 text-black w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-400 transition duration-300 ease-in-out hover:scale-110">
          <IconPlayFill className="w-8 h-8" fill="black" />
        </Button>
        {/* <Button variant="ghost" className="text-white">
          <MoreVertical className="w-6 h-6" />
        </Button> */}
      </div>

      {/* Track List */}
      <div className=" p-4">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow className="hover:bg-transparent items-center justify-center">
              <TableCell className="text-gray-400 flex">#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell className="text-gray-400 hidden md:flex">
                Date added
              </TableCell>
              <TableCell className="text-right text-gray-400 md:table-cell hidden md:justify-center">
                <IconDuration className="w-5 h-5" fill="white" />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlistTracks?.map(
              ({ track, added_at }: { track: any; added_at: string }) => {
                count++;
                const duration = convertMillisToMinSec(track?.duration_ms);

                return (
                  <TableRow
                    key={track?.id}
                    className="hover:bg-neutral-800 cursor-pointer"
                  >
                    <TableCell className="text-gray-400">{count}</TableCell>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={track?.album?.images?.[0]?.url}
                        alt={track?.name}
                        className="w-10 h-10"
                      />
                      <div>
                        <div className="font-semibold">{track?.name}</div>
                        <div className="text-sm text-gray-400">
                          {track?.artists
                            .map((artist: any) => artist.name)
                            .join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="">{track?.album?.name}</TableCell>
                    <TableCell className="text-gray-400 hidden md:flex text-left">
                      {moment(added_at).format("ll")}
                    </TableCell>
                    <TableCell className="text-left hidden sm:table-cell">
                      {duration}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {/* Modal to Update Playlist */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-neutral-800 border-none p-6">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Details</DialogTitle>
            </DialogHeader>

            <form className="space-y-4 h-[15rem] w-96">
              {/* Playlist Icon */}
              <div
                className="flex flex-row justify-between gap-3 "
                style={{ width: "max-content" }}
              >
                <div className="w-auto">
                  <img
                    src={playListDetails?.images?.[0]?.url}
                    alt="Playlist Cover"
                    className=" w-50 h-40 cursor-pointer hover:opacity-30"
                  ></img>
                  <Input type="file" accept="image/*" className="hidden" />
                </div>

                <div className="flex flex-col flex-grow gap-3 justify-start w-[15rem]">
                  {" "}
                  {/* Playlist Name */}
                  <div className="">
                    <label className="block text-sm font-light text-muted-foreground text-white mb-1 ">
                      Playlist Name
                    </label>
                    {name?.length > 0 && (
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e?.target?.value)}
                        className="border-none bg-neutral-600 rounded-sm w-full p-2 text-sm text-white outline-0 focus:outline-none placeholder:text-white placeholder:text-sm placeholder:font-light"
                      />
                    )}
                  </div>
                  {/* Playlist Description */}
                  <div className="">
                    <label className="block text-sm font-light text-muted-foreground text-white mb-1 ">
                      Description
                    </label>
                    <Input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e?.target?.value)}
                      className="border-none bg-neutral-600 rounded-sm w-full p-2 text-sm text-white outline-0 focus:outline-none placeholder:text-white placeholder:text-sm placeholder:font-light"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Custom Close Icon */}
            <DialogClose className="hidden opacity-0" />
            <button
              onClick={handleModalClose}
              className="absolute bottom-8 right-8 text-white hover:text-white transition-all bg-neutral-600 px-4 py-2 rounded-sm shadow-none"
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PlaylistTableView;
