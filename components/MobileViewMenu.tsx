import IconExploreExpanded from "@/utils/svg-icons/IconExploreExpanded";
import IconHome from "@/utils/svg-icons/IconHome";
import Link from "next/link";
import React from "react";

const MobileViewMenu = () => {
  return (
    <div className="sticky md:hidden bottom-0 left-64 right-0 h-16 bg-neutral-950 bg-opacity-80 p-4 flex justify-between justify-items-center z-10">
      <ul className="flex flex-row md:flex-row md:space-x-4 justify-between items-center w-full text-center">
        <li className="w-full">
          <Link
            href="/"
            className="w-full text-white hover:text-green-500 py-2 px-4 rounded transition duration-200 flex flex-col justify-start items-center"
          >
            <IconHome width={"2rem"} height={"2rem"} />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        {/* <li className="w-full">
          <Link
            href="/playlist"
            className="w-full text-white hover:text-green-500 py-2 px-4 rounded transition duration-200 flex flex-col justify-start items-center"
          >
            <IconExploreExpanded width={"2rem"} height={"2rem"} />
            <span className="text-xs"> Your Library</span>
          </Link>
        </li> */}

        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default MobileViewMenu;
