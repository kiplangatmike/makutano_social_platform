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
      <div className="relative mx-auto max-w-[1350px] px-5">
        <div className="my-5 flex">
          {session && (
            <div className="left-4 space-y-2 fixed w-max md:w-[300px]">
              <Sidebar />
            </div>
          )}
          <div className="ml-auto w-[80%] sm:w-[50vw] md:mt-[0px] b1200:w-[70vw] xl:mx-auto xl:w-[45vw]">
            {children}
          </div>
          {session && (
            <aside className="no-scrollbar mt-0 hidden h-[80vh] w-[325px] overflow-y-auto md:fixed md:top-24 md:hidden lg:right-8 xl:block">
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
