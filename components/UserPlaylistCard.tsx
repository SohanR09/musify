import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface UserPlaylistCard {
  imageUrl: string;
  title: string;
  playlistId?: any;
}

export default function UserPlaylistCard({
  imageUrl,
  title,
  playlistId,
}: UserPlaylistCard) {
  return (
    <Link href={`${playlistId?.length > 0 ? `/playlist/${playlistId}` : "/"}`}>
      <Card className="w-40 sm:w-full sm:h-16 bg-neutral-800 rounded-sm shadow-md hover:bg-neutral-700 transition-transform  border-none hover:cursor-pointer">
        <CardContent className="flex items-center flex-row flex-1  p-0 gap-1">
          {/* Image Section */}
          <div className="relative w-20 h-12 md:h-20 overflow-hidden mr-2">
            <img
              className="w-16 h-16 object-cover"
              src={imageUrl}
              alt={title}
            />
          </div>
          <h3 className="w-full text-white text-sm sm:text-base font-semibold leading-tight truncate">
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
