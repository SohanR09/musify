// components/PlaylistCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface PlaylistCardProps {
  title?: string;
  imageUrl?: string;
  playlistId?: any;
  description?: string;
  toPlay?: "yes" | "no";
  type?: "playlist" | "track";
}

const PlaylistCard = ({
  title,
  imageUrl,
  playlistId,
  description,
  toPlay,
  type,
}: PlaylistCardProps) => {
  return (
    <Link
      href={`${
        playlistId !== "" && toPlay === "no"
          ? `/track/${playlistId}`
          : type === "track"
          ? "/"
          : `/playlist/${playlistId}`
      }`}
      passHref
      onClick={() => {
        window.sessionStorage.setItem("playerId", playlistId); // Dispatch a custom event to notify the player component
        window.dispatchEvent(new Event("trackIdUpdated"));
      }}
    >
      <Card className="min-w-[200px] max-w-[210px] h-[250px] bg-neutral-900 transition-transform transform hover:bg-neutral-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl cursor-pointer border-0">
        <CardContent className="flex flex-col justify-between p-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-t-sm"
          />
          <div className="absolute" />
          <Link
            href={`${
              type === "track"
                ? `/track/${playlistId}`
                : `/playlist/${playlistId}`
            }`}
            passHref
          >
            <h3 className="text-lg font-semibold text-white truncate mt-2 hover:underline">
              {title}
            </h3>
          </Link>
          <p className="text-gray-400 text-sm truncate">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
