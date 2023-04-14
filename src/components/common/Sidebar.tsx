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
    <div className="left-4 top-24 w-[60px] space-y-8 sm:w-max md:fixed md:w-[300px]">
      {/* First card */}
      <section className="rounded-3xl px-4 pb-4 text-center drop-shadow-lg dark:bg-gray-900">
        <div className="relative mb-1 flex flex-col items-center md:flex-row md:items-center">
          <Link
            href={`/profile/${session?.user?.uid}`}
            className="ml-2 mt-4 h-[40px] min-w-[40px] cursor-pointer capitalize"
          >
            <Avatar size={40} />
          </Link>

          <div className="hidden px-6 py-4 text-left sm:block">
            <Link href={`/profile/${session?.user?.uid}`} className="block">
              <h3 className="cursor-pointer divide-amber-800/80 font-semibold capitalize underline-offset-1 hover:underline">
                {session?.user?.name}
              </h3>
            </Link>
            <p className="t-secondary text-sm">{session?.user?.email}</p>
          </div>
        </div>

        <div className="text-left text-sm sm:mb-1">
          <Link
            href="/feed"
            className="sidebar-section card-btn flex items-center sm:space-x-1.5 sm:p-3"
          >
            <MdHome className="mui-icon t-secondary sm:min-w-4 h-12 w-12 sm:h-4 sm:w-4" />
            <h4 className="text-x hidden font-semibold sm:block">Feed</h4>
          </Link>
        </div>
        <div className="text-left text-sm sm:pb-2">
          <Link
            href="/chapters"
            className="sidebar-section card-btn flex items-center sm:space-x-1.5 sm:p-3"
          >
            <TbBuildingBank className="mui-icon t-secondary h-12 w-12 sm:h-4 sm:w-4" />
            <h4 className="text-x hidden font-semibold sm:block">Chapters</h4>
          </Link>
          <div className="hidden flex-col gap-2 pl-8 md:flex">
            {allChapters?.slice(0, 5).map((chapter: Chapters) => (
              <Link
                href={`/chapters/${chapter?.id}`}
                key={chapter?.id}
                className="flex gap-2"
              >
                <TbBrandWechat className="mui-icon t-secondary h-12 w-12 sm:h-4 sm:w-4" />
                <h4 className="text-x font-semibold">{chapter?.name}</h4>
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sidebar-section sidebar-btn card-btn -ml-5 mt-2 sm:ml-0 sm:flex sm:w-full sm:items-center sm:gap-3 sm:p-3 sm:px-8"
        >
          <BiLogOut className="mui-icon t-secondary h-9 w-9 sm:h-4 sm:w-4" />
          <h4 className="hidden font-semibold sm:block">Logout</h4>
        </button>

        <div className="sidebar-section sidebar-btn card-btn hidden w-full p-3 px-8 pt-8 sm:block">
          <motion.button
            onClick={openModal}
            className="rounded-xl bg-white px-8 py-2 text-lg font-semibold text-slate-600 transition-all duration-300 ease-in hover:bg-blue-400/25 hover:text-white"
          >
            Create Post
          </motion.button>
        </div>
        <svg
          onClick={openModal}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="t-secondary -ml-2 mt-4 block h-12 w-12 sm:hidden"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>
      </section>
    </div>
  );
}
