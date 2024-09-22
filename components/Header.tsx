// components/Header.tsx
import spotifyApi from "@/lib/spotify";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, User } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to control dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // Function to handle closing dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  // Attach event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [userData, setUserData] = useState<{
    userName: string;
    email: string;
    imageUrl: string;
  }>({ userName: "", email: "", imageUrl: "" });

  useEffect(() => {
    let user;
    if (!userData?.imageUrl) {
      user = window.sessionStorage.getItem("userData");
    } else user = null;
    if (user != null) setUserData(JSON.parse(user));
  }, [session, userData]);

  return (
    <div className="sticky top-2 left-64 right-0 h-14 bg-black p-4 flex justify-between justify-items-center z-10">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10"
        >
          <circle cx="12" cy="12" r="10" fill="#FFFFFF" />
          <path
            fill="#000000"
            d="M8 10.5c1.8-.5 3.8-.5 5.8.5 1.1.4 2.4.4 3.3.1.4-.1.7.1.8.4.1.4-.1.7-.4.8-1.2.4-2.7.4-3.9-.2-1.7-.8-3.4-.8-5.1-.2-.3.1-.7-.1-.8-.4s.1-.7.3-.8zM8 13c1.5-.4 3.3-.3 4.7.4 1 .4 2 .4 2.8.1.3-.1.6.1.7.4.1.4-.1.7-.4.8-.9.3-2.2.3-3.2-.2-1.3-.6-2.7-.7-4.2-.2-.3.1-.7-.1-.8-.4-.1-.4.1-.7.4-.8zM8.2 15.5c1.1-.3 2.5-.2 3.6.3.7.3 1.6.3 2.2.1.2-.1.6.1.6.4.1.4-.1.7-.5.8-.7.2-1.7.2-2.6-.2-1.1-.5-2.3-.5-3.4-.2-.3.1-.7-.1-.8-.4-.1-.3.1-.7.5-.8z"
          />
        </svg>
        <h1 className="text-white text-2xl font-bold tracking-tight hidden md:flex">
          Musify
        </h1>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        {userData?.imageUrl ? (
          <Avatar className="w-10 h-10">
            <AvatarImage src={userData?.imageUrl} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ) : (
          "☰"
          // {/* Hamburger Icon */}
        )}
      </button>
      <nav
        className={`h-full fixed inset-0 bg-neutral-900 bg-opacity-95 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:static md:translate-x-0 md:hidden flex-col  md:items-center md:bg-transparent md:opacity-100 z-100`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-white">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white focus:outline-none"
          >
            ✕ {/* Close Icon */}
          </button>
        </div>
        <ul className="flex flex-col md:flex-row md:space-x-4 p-4 md:p-0">
          <li className="w-full">
            <Link
              href="/"
              className="block w-full text-white hover:text-green-500 py-2 px-4 rounded transition duration-200"
            >
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/playlists"
              className="block w-full text-white hover:text-green-500 py-2 px-4 rounded transition duration-200"
            >
              Playlists
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/library"
              className="block w-full text-white hover:text-green-500 py-2 px-4 rounded transition duration-200"
            >
              Library
            </Link>
          </li>
          {/* Add more menu items as needed */}
          {/* Logout Button */}
          <li className="w-full">
            <button
              onClick={() => {
                signOut();
                window.sessionStorage.clear();
              }}
              className="block w-full text-red-500 hover:text-red-600 py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {session && (
        <div className="md:flex hidden items-center">
          {userData?.imageUrl ? (
            // Avatar
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={userData?.imageUrl} alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </button>
          ) : (
            ""
          )}
        </div>
      )}
      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-4 top-full mt-1 w-48 bg-zinc-800  rounded-sm shadow-lg z-20"
        >
          <ul className="py-2">
            <li className="px-4 py-2 text-white-700 hover:bg-zinc-700  cursor-pointer">
              <User className="inline mr-2 w-5 h-5" />
              Profile
            </li>
            <li
              className="px-4 py-2 text-white-700 hover:bg-zinc-700 cursor-pointer"
              onClick={() => {
                signOut();
                window.sessionStorage.clear();
              }}
            >
              <LogOut className="inline mr-2 w-5 h-5" />
              Logout
            </li>
            {/* Add more options similar to Spotify */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
