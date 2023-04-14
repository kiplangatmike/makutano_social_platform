import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { MdAdd, MdBookmark, MdHome } from "react-icons/md";
import { TbBuildingBank } from "react-icons/tb";
import { SiArtifacthub } from "react-icons/si";
import { TbBrandWechat } from "react-icons/tb";
import Avatar from "$components/common/Avatar";
import premium_icon from "$public/premium.svg";
import Link from "next/link";

import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { motion } from "framer-motion";

import { modalState, modalTypeState } from "$lib/atoms";
import { BiLogOut } from "react-icons/bi";
import { useGetAllChaptersQuery } from "$services/baseApiSlice";
import { Chapters } from "@prisma/client";

export default function Sidebar() {
  const { data: session } = useSession();

  const setModalOpen = useSetAtom(modalState);
  const setModalType = useSetAtom(modalTypeState);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalType("dropIn");
  }, [setModalOpen, setModalType]);

  const { data: allChapters } = useGetAllChaptersQuery(undefined);

  return (
    <div className="left-4 top-24 space-y-4 md:fixed md:w-[300px]">
      {/* First card */}
      <section className="rounded-3xl px-4 text-center drop-shadow-lg dark:bg-gray-900">
        <div className="relative mb-1 flex">
          <Link
            href={`/profile/${session?.user?.uid}`}
            className="ml-2 mt-4 h-[40px] min-w-[40px] cursor-pointer capitalize"
          >
            <Avatar size={40} />
          </Link>

          <div className="px-6 py-4 text-left">
            <Link href={`/profile/${session?.user?.uid}`} className="block">
              <h3 className="cursor-pointer divide-amber-800/80 font-semibold capitalize underline-offset-1 hover:underline">
                {session?.user?.name}
              </h3>
            </Link>
            <p className="t-secondary text-sm">{session?.user?.email}</p>
          </div>
        </div>

        <div className="mb-1 hidden text-left text-sm md:block">
          <Link
            href="/feed"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <MdHome className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Feed</h4>
          </Link>
        </div>
        <div className="mb-1 hidden pb-2 text-left text-sm md:block">
          <Link
            href="/chapters"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <TbBuildingBank className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Chapters</h4>
          </Link>
          <div className="flex flex-col gap-2 pl-8">
            {allChapters?.slice(0, 5).map((chapter: Chapters) => (
              <Link
                href={`/chapters/${chapter?.id}`}
                key={chapter?.id}
                className="flex gap-2"
              >
                <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
                <h4 className="text-x font-semibold">{chapter?.name}</h4>
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sidebar-section sidebar-btn card-btn mt-2 flex w-full items-center gap-3 p-3 px-8"
        >
          <BiLogOut className="mui-icon t-secondary h-4 w-4" />
          <h4 className="font-semibold">Logout</h4>
        </button>

        <div className="sidebar-section sidebar-btn card-btn w-full p-3 px-8 pt-8">
          <motion.button
            onClick={openModal}
            className="rounded-xl bg-white px-8 py-2 text-lg font-semibold text-slate-600 transition-all duration-300 ease-in hover:bg-blue-400/25 hover:text-white"
          >
            Create Post
          </motion.button>
        </div>
      </section>
    </div>
  );
}
