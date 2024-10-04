import { getPlaylists } from "@/utils/api-spotify/GetPlaylist";
import { useEffect, useRef, useState } from "react";
import SideBarList from "./SideBarList";
import IconExploreExpanded from "@/utils/svg-icons/IconExploreExpanded";
import IconExploreCollapsed from "@/utils/svg-icons/IconExploreCollapsed";
import SortedPlayList from "@/utils/functions/SortPlayList";
import serachPlayList from "@/utils/functions/SearchPlayList";
import IconSearch from "@/utils/svg-icons/IconSearch";
import { Input } from "./ui/input";
import { useParams } from "next/navigation";

// components/Sidebar.tsx
const Sidebar = ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: string;
}) => {
  const params = useParams();
  const playListId = params?.id?.[0];

  const [playlists, setPlaylists] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [finalPLayList, setFinalPlayList] = useState<any>();
  const [tempfinalPLayList, setTempfinalPLayList] = useState<any>();

  // Fetch playlists when component mounts
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        if (accessToken) {
          const playlistsData = await getPlaylists(accessToken);
          setPlaylists(playlistsData);
        }
      } catch (err) {
        setError("Failed to fetch playlists");
      }
    };

    if (accessToken) {
      fetchPlaylists();
    }
  }, [accessToken]);

  // Toggle search visibility
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  // Reference for the search input to detect clicks outside
  const inputRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside of the search input field to collapse it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  useEffect(() => {
    let temp: any;
    playlists?.length > 0 &&
      user &&
      (temp = SortedPlayList({ playlists, user }));
    temp?.length > 0 && setTempfinalPLayList(temp);
  }, [playlists]);

  useEffect(() => {
    if (tempfinalPLayList?.length > 0) setFinalPlayList(tempfinalPLayList);
  }, [tempfinalPLayList]);

  useEffect(() => {
    let tempSearch: any;
    searchQuery?.length > 0
      ? (tempSearch = serachPlayList({ tempfinalPLayList, searchQuery }))
      : (tempSearch = tempfinalPLayList);
    tempSearch?.length > 0 && setFinalPlayList(tempSearch);
  }, [searchQuery]);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      {/* {!isCollapsed ? ( */}
      <aside
        className={`bg-neutral-900 rounded-lg mx-2 my-4 text-gray-400  overflow-y-scroll scroll-smooth  h-[80vh]  md:block hidden overflow-hidden no-scrollbar ${
          !isCollapsed ? " w-1/4 pl-4 pr-1" : "pl-1 w-20"
        }`}
      >
        {!isCollapsed ? (
          <div className="sticky top-0 h-[10vh] w-full bg-neutral-900 py-4">
            <h2
              onClick={toggleSidebar}
              className="text-xl font-normal text-white cursor-pointer flex"
            >
              <IconExploreExpanded className="h-6 w-6 mr-2" />
              Your library
            </h2>
            {/* Search Section */}
            <div className="relative p-2 -left-2 h-[70px]" ref={inputRef}>
              {/* Search Icon */}
              {!searchVisible && (
                <button
                  className="text-neutral-500 hover:text-neutral-200 hover:bg-neutral-700 hover:rounded-[50%] focus:outline-none px-2 py-2 "
                  onClick={toggleSearch}
                >
                  <IconSearch className="h-6 w-6" />
                </button>
              )}

              {/* Roll-Out Search Input using shadcn */}
              {searchVisible && (
                <div
                  className={`top-0 left-0 transform transition-all duration-500 ease-in-out flex items-center px-2 py-0 bg-neutral-700 rounded-md ${
                    searchVisible ? "w-[50%] opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <IconSearch className="h-7 w-7 text-white" />
                  <Input
                    type="text"
                    placeholder="Search your library"
                    className="w-full p-2 text-sm text-white border-none  outline-0 focus:outline-none placeholder:text-white placeholder:text-sm placeholder:font-light"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer flex justify-center items-center h-20"
            onClick={toggleSidebar}
          >
            <IconExploreCollapsed className="h-6 w-6" />
          </div>
        )}

        {/* PlayLists */}
        {finalPLayList?.length === 0 ? (
          <p className="text-gray-500">...Loading</p>
        ) : (
          <SideBarList
            playlists={finalPLayList}
            isCollapsed={isCollapsed}
            playListId={playListId}
          />
        )}
      </aside>
    </>
  );
};

export default Sidebar;
