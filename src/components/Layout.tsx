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
    <div className="h-screen overflow-y-scroll bg-lstone transition-all dark:bg-black">
      <Head>
        <title>Feed | Makutano</title>
      </Head>
      <Header />
      {/* <Navbar /> */}
      <div className="px-4">
        <div className="mx-auto my-6 grid max-w-xl grid-cols-1 gap-5 md:max-w-3xl md:grid-cols-[7fr_17fr] lg:max-w-6xl lg:grid-cols-[5fr_12fr_7fr]">
          <Sidebar />
          {children}
          <aside className="block md:hidden lg:block">
            <Widgets />
            <Footer />
          </aside>
        </div>
      </div>
      <Modal />
    </div>
  );
}
