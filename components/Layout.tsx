// components/Layout.tsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Head>
        <title>Musify</title> {/* Update your title here */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-black text-white overflow-y-scroll space-y-1 scrollbar-hide scroll-smooth">
        <Header />
        <div className="flex flex-1 flex-col md:flex-row">
          <Sidebar />

          <main className=" bg-neutral-900  rounded-lg mx-2 my-4 flex-1 flex-grow overflow-y-scroll scroll-smooth  md:h-[84vh] pt-2 p-4 md:p-6 z-0 mb-10 md:mb-0">
            {children}
          </main>
        </div>
        <Player />
      </div>
    </SessionProvider>
  );
};

export default Layout;
