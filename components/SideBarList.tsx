import IconDot from "@/utils/svg-icons/IconDot";
import IconPlayFill from "@/utils/svg-icons/IconPlayFilled";
import Link from "next/link";

const SideBarList = ({
  playlists,
  isCollapsed,
  playListId,
}: {
  playlists: any;
  isCollapsed: boolean;
  playListId: string;
}) => {
  return (
    <ul
      className={`space-y-2 flex-1 overflow-y-scroll overflow-x-hidden h-[71vh] ${
        isCollapsed && "no-scrollbar"
      }`}
    >
      {playlists?.map(
        ({
          id,
          name,
          images,
          owner,
        }: {
          id: string;
          name: string;
          images: any;
          owner: any;
        }) => {
          return (
            <li
              key={id}
              className={`hover:bg-neutral-800 rounded-sm group ${
                playListId === id && "bg-neutral-700"
              }`}
            >
              {!isCollapsed ? (
                <Link
                  href={`/playlist/${id}`}
                  className="flex items-center space-x-4 hover:text-gray-400 relative"
                >
                  <img
                    src={images?.[0]?.url}
                    alt={name}
                    width={60}
                    height={60}
                    className="rounded-sm"
                  />
                  {/* Play Icon (Appears on Hover) */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 w-16 -left-4 `}
                  >
                    <IconPlayFill fill="white" />
                  </div>
                  <span className="flex flex-col">
                    <span className="text-md font-large truncate font-bold text-white">
                      {name}
                    </span>
                    <span className="text-sm font-medium truncate flex items-center">
                      PlayList
                      <IconDot />
                      {owner?.display_name}
                    </span>
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/playlist/${id}`}
                  className="flex items-center justify-center space-x-4  relative"
                >
                  <img
                    src={images?.[0]?.url}
                    alt={name}
                    className="rounded-sm w-10 h-10 hover:text-gray-400"
                  />
                </Link>
              )}
            </li>
          );
        }
      )}
    </ul>
  );
};

export default SideBarList;
