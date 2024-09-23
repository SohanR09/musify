import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

interface UserPlaylistCard {
  imageUrl: string;
  title: string;
  playlistId?: string;
}

export default function UserPlaylistCard({
  imageUrl,
  title,
  playlistId,
}: UserPlaylistCard) {
  return (
    <Card className="w-full h-16 bg-neutral-800 rounded-sm shadow-md hover:bg-neutral-700 transition-transform  border-none hover:cursor-pointer">
      <CardHeader className="flex justify-start items-start flex-row  p-0">
        {/* Image Section */}
        <div className="relative w-20 h-20 rounded-md overflow-hidden">
          <img className="w-16 h-16" src={imageUrl} alt={title} />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-start overflow-hidden ml-1">
          {/* Title */}
          <h3 className="text-white text-sm sm:text-base font-semibold leading-tight truncate">
            {title}
          </h3>

          {/* Subtitle or Description (optional) */}
          <p className="text-gray-400 text-xs sm:text-sm truncate"></p>
        </div>
      </CardHeader>
    </Card>
  );
}
