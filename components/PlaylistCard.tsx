// components/PlaylistCard.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

interface PlaylistCardProps {
  title?: string;
  imageUrl?: string;
  playlistId?: string;
  description?: string;
}

const PlaylistCard = ({
  title,
  imageUrl,
  playlistId,
  description,
}: PlaylistCardProps) => {
  return (
    <Link href={`/playlists/${playlistId}`} passHref>
      <Card className="min-w-[200px] max-w-[210px] h-[280px] bg-neutral-900 transition-transform transform hover:bg-neutral-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl cursor-pointer border-0">
        <CardHeader className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-t-sm"
          />
          <div className="absolute" />
        </CardHeader>
        <CardContent className="flex flex-col justify-between p-4">
          <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
          <p className="text-gray-400 text-sm truncate">{description}</p>
        </CardContent>
        <CardFooter className="p-4">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full w-full">
            Play
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
