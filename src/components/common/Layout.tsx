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
    <div className="dark:to-[#19 h-screen overflow-y-scroll bg-lstone transition-all dark:bg-gradient-radial dark:from-[#15202b] dark:from-100% dark:to-50%">
      <Header />
      {/* <div className="relativ mx-auto max-w-[1240px]"> */}
      <div className="px-5">
        <div className="my-5">
          <div className="left-4 space-y-2 md:absolute md:w-[300px]">
            <Sidebar />
          </div>
          <div className="mt-[20px]  md:ml-[312px] md:mt-[0px] b400:min-w-[450px] b400:max-w-[840px] lg:w-[] b600:max-w-[540px]">
            {children}
          </div>
          <aside className="mt-0 hidden h-[80vh] w-[325px] overflow-y-auto md:absolute md:top-24 md:hidden lg:right-4 b600:block">
            <Widgets />
          </aside>
        </div>
      </div>
      <Modal />
    </div>
    // </div>
  );
}
