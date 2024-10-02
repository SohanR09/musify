// components/Layout.tsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import MobileViewMenu from "./MobileViewMenu";

const Layout = ({
  children,
  accessToken,
  user,
}: {
  children: React.ReactNode;
  accessToken: string;
  user: string;
}) => {
  return (
    <SessionProvider>
      <Head>
        <title>Musify</title> {/* Update your title here */}
        <link rel="icon" href="/components/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-white overflow-y-scroll no-scrollbar space-y-1 scrollbar-hide scroll-smooth">
        <Header />
        <div className="flex flex-1 flex-col md:flex-row">
          <Sidebar user={user} accessToken={accessToken} />

          <main className=" sm:bg-neutral-900  rounded-lg mx-2 my-4 flex-1 flex-grow md:overflow-y-scroll overflow-y-hidden md:scroll-smooth  md:h-[82vh] z-0 mb-10 md:mb-0">
            {children}
          </main>
        </div>
        {/* <Player accessToken={accessToken} /> */}
        <MobileViewMenu />
      </div>
    </SessionProvider>
  );
};

export default Layout;
