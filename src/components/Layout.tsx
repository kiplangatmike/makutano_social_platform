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
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-gradient-radial dark:from-[#15202b] dark:from-100% dark:to-[#194547] dark:to-50%">
      <Head>
        <title>Feed | Makutano</title>
      </Head>
      <Header />
      {/* <Navbar /> */}
      <div className="px-5">
        <div className="my-6">
          <Sidebar />
          <div className="ml-[27vw]  min-w-[400px] max-w-[42vw]">{children}</div>
          <aside className="fixed right-4 top-20 mt-0 block h-[80vh] w-[325px] overflow-y-auto md:hidden lg:block">
            <Widgets />
          </aside>
        </div>
      </div>
      <Modal />
    </div>
  );
}
