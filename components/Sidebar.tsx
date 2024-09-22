import Link from "next/link";

// components/Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="bg-neutral-900 rounded-lg mx-2 my-4 text-gray-400 w-1/4 overflow-y-scroll scroll-smooth  h-[84vh] p-4 md:block hidden ">
      <h2 className="text-xl font-bold text-white">Your playlists</h2>
      <ul className="mt-4">
        <li>
          <Link href="/" className="block text-white hover:text-green-500 py-2">
            Home
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
