import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link href="/" passHref>
        <Button className="mt-6 bg-green-500 hover:bg-green-600">
          Go Back to Home
        </Button>
      </Link>

      <div className="mt-10">
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
      </div>
    </div>
  );
}
