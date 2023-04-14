import Head from "next/head";
import Header from "./Header";
// import Navbar from "./navbar";
import Modal from "./Modal";

import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Widgets from "./updates";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  return (
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-gradient-radial dark:from-[#15202b] dark:from-100% dark:to-50%">
      <Header />
      {/* <div className="relativ mx-auto max-w-[1240px]"> */}
      <div className="px-5">
        <div className="my-5">
          {session && (
            <div className="left-4 space-y-2 md:absolute md:w-[300px]">
              <Sidebar />
            </div>
          )}
          <div className="mx-auto mt-[20px] w-[60vw] max-w-[600px] md:mt-[0px]">
            {children}
          </div>
          {session && (
            <aside className="mt-0 hidden h-[80vh] w-[325px] overflow-y-auto md:absolute md:top-24 md:hidden lg:right-4 b600:block">
              <Widgets />
            </aside>
          )}
        </div>
      </div>
      <Modal />
    </div>
    // </div>
  );
}
