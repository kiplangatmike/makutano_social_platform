import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { MdAdd, MdBookmark } from "react-icons/md";
import { TbBuildingBank } from "react-icons/tb";
import { SiArtifacthub } from "react-icons/si";
import { TbBrandWechat } from "react-icons/tb";
import Avatar from "$components/Avatar";
import premium_icon from "$public/premium.svg";
import Link from "next/link";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="left-0 top-0 space-y-2">
      {/* First card */}
      <section className="feed-card rounded-3xl text-center">
        {/* <div className="-ml-3 -mr-3 h-14 min-w-full bg-[url('/sidebar_bg.svg')] bg-cover bg-center"></div> */}

        <div className="mx-auto flex">
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="cursor-pointer p-2 "
          >
            <Avatar size={24} />
          </button>

          <div className="px-6 py-4 text-left">
            <Link href="#" className="block">
              <h3 className="cursor-pointer divide-amber-800/80 font-semibold underline-offset-1 hover:underline">
                {session?.user?.name}
              </h3>
            </Link>
            <p className="t-secondary text-sm">{session?.user?.email}</p>
          </div>
        </div>

        <div className="hidden px-6 text-left text-sm md:block">
          {/* <div className="sidebar-section py-3">
            <a
              href="#"
              className="sidebar-btn card-btn flex justify-between space-x-2 py-1 text-xs"
            >
              <h4 className="t-secondary font-semibold">
                Who viewed your profile
              </h4>
              <span className="t-link">39</span>
            </a>
            <a
              href="#"
              className="sidebar-btn card-btn flex justify-between space-x-2 py-1 text-xs"
            >
              <h4 className="t-secondary font-semibold">Views of your post</h4>
              <span className="t-link">629</span>
            </a>
          </div> */}

          {/* <a
            href="#"
            className="sidebar-section sidebar-btn card-btn py-3 text-xs"
          >
            <h4 className="t-secondary">Access exclusive tools & insights</h4>
            <span className="flex items-center space-x-2">
              <Image
                src={premium_icon}
                alt="premium app icon"
                width={16}
                height={16}
              />
              <span className="t-link font-semibold">
                Get Hired Faster, Try Premium Free
              </span>
            </span>
          </a> */}

          <Link
            href="#"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <MdBookmark className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">My items</h4>
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
        <div className="hidden px-6 text-left text-sm md:block">
          <Link
            href="#"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <TbBuildingBank className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Chapters</h4>
          </Link>
          <div className=" pl-8">
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
        <div className="hidden px-6 text-left text-sm md:block">
          <Link
            href="#"
            className="sidebar-section card-btn flex items-center space-x-1.5 p-3"
          >
            <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
            <h4 className="text-x font-semibold">Direct Message</h4>
          </Link>

          <div className=" pl-8">
            <Link href="/messaging" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">Liplan</h4>
            </Link>
            <Link href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">Mercy</h4>
            </Link>
            <Link href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">Mike</h4>
            </Link>
            <Link href="#" className="flex gap-2">
              <TbBrandWechat className="mui-icon t-secondary h-4 w-4" />
              <h4 className="text-x font-semibold">Nyamusi</h4>
            </Link>
          </div>
        </div>

        <a className="sidebar-section sidebar-btn card-btn mt-2 p-3 px-8">
          <h4 className="t-secondary text-sm font-semibold">Logout</h4>
        </a>
      </section>
    </div>
  );
}
