import Head from "next/head";
import Header from "./Header";
// import Navbar from "./navbar";
import Modal from "./Modal";

import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-gradient-radial dark:from-[#15202b] dark:from-100% dark:to-[#19 dark:to-50%">
      <Head>
        <title>Feed | Makutano</title>
      </Head>
      <Header />
      {/* <Navbar /> */}
      <div className="px-5">
        <div className="my-5">
          <Sidebar />
          <div className="md:ml-[312px] mt-[20px] b400:w-[600px] md:mt-[0px] min-w-[400px] md:max-w-[555px] b600:flex-1">{children}</div>
          <aside className="fixed lg:right-4 md:top-24 mt-0 hidden h-[80vh] w-[325px] overflow-y-auto md:hidden b600:block lg:bloc">
            <Widgets />
          </aside>
        </div>
      </div>
      <Modal />
    </div>
  );
}
