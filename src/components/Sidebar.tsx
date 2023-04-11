import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { MdAdd, MdBookmark } from "react-icons/md";
import { TbBuildingBank } from "react-icons/tb";
import { SiArtifacthub } from "react-icons/si";
import { TbBrandWechat } from "react-icons/tb";
import Avatar from "$components/Avatar";
import premium_icon from "$public/premium.svg";
import Link from "next/link";

import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { motion } from "framer-motion";

import { modalState, modalTypeState } from "$lib/atoms";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar() {
  const { data: session } = useSession();

  const setModalOpen = useSetAtom(modalState);
  const setModalType = useSetAtom(modalTypeState);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalType("dropIn");
  }, [setModalOpen, setModalType]);

  return (
    <div className="fixed left-4 top-24 w-[320px] space-y-2">
      {/* First card */}
      <section className="feed-card rounded-3xl text-center">
        <div className="relative mx-auto flex">
          <Link
            href={`/profile/12`}
            className="ml-8 mt-4 h-[40px] min-w-[40px] cursor-pointer"
          >
            <Avatar size={40} />
          </Link>

          <div className="px-6 py-4 text-left">
            <Link href={`/profile/12`} className="block">
              <h3 className="cursor-pointer divide-amber-800/80 font-semibold underline-offset-1 hover:underline">
                {session?.user?.name}
              </h3>
            </Link>
            <p className="t-secondary text-sm">{session?.user?.email}</p>
          </div>
        </div>

        <div className="hidden px-6 text-left text-sm md:block">
          <Link
            href="#"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <MdBookmark className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Bookmarks</h4>
          </Link>
        </div>

        <div className="hidden px-6 text-left text-sm md:block">
          <Link
            href="#"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <SiArtifacthub className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Hubs</h4>
          </Link>
        </div>
        <div className="hidden px-6 pb-2 text-left text-sm md:block">
          <Link
            href="#"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <TbBuildingBank className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Chapters</h4>
          </Link>
          <div className="flex flex-col gap-2 pl-8">
            <Link href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">ALU</h4>
            </Link>
            <a href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">UON</h4>
            </a>
            <Link href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">KU</h4>
            </Link>
            <Link href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">MKU</h4>
            </Link>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sidebar-section sidebar-btn card-btn mt-2 flex w-full items-center gap-3 p-3 px-8"
        >
          <BiLogOut className="mui-icon t-secondary h-4 w-4" />
          <h4 className="text-x font-semibold">Logout</h4>
        </button>

        <div className="sidebar-section sidebar-btn card-btn w-full p-3 px-8">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="t-secondary rounded-3xl bg-amber-800 px-8 py-2 text-lg font-semibold"
          >
            Create Post
          </motion.button>
        </div>
      </section>
    </div>
  );
}
