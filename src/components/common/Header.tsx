import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MdOutlineWorkOutline, MdNotifications } from "react-icons/md";
import { TbBrandGoogleHome, TbBuildingBank } from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import icon from "$public/icon.png";
import icon_white from "$public/icon_white.png";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import HeaderLink from "./HeaderLink";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const router = useRouter();

  const { data: session } = useSession();

  return (
    <header className="t-primary  sticky top-0 z-10 bg-white px-4 py-2 focus-within:shadow dark:bg-gray-900">
      <nav className="max-w-8xl mx-auto flex items-center justify-between py-1">
        {/* Left */}
        <div className="flex max-w-xs items-center  text-xl font-semibold">
          <Link href="/feed" className="flex">
            {resolvedTheme === "dark" ? (
              <div>MAKUTANO</div>
            ) : (
              <Image src={icon} alt="" width={34} height={34} />
            )}
          </Link>
        </div>

        {/* Right */}
        <div className=" flex items-center space-x-4  rounded-xl  px-2 py-2">
          <div className="flex">
            <HeaderLink
              Icon={TbBrandGoogleHome}
              feed
              active={router.pathname === "/feed"}
              link="/feed"
            >
              Home
            </HeaderLink>
          </div>
          <div className="hidden">
            <HeaderLink
              Icon={SlPeople}
              feed
              active={router.pathname === "/mynetwork"}
              link="/mynetwork"
            >
              My Network
            </HeaderLink>
          </div>
          <div>
            <HeaderLink
              active={router.pathname.includes("/chapters")}
              Icon={TbBuildingBank}
              feed
              link="/chapters"
            >
              Chapters
            </HeaderLink>
          </div>
          <div>
            <HeaderLink
              Icon={MdOutlineWorkOutline}
              active={router.pathname.includes("/opportunity")}
              feed
              hidden
              link="/opportunity"
            >
              Opportunities
            </HeaderLink>
          </div>
        </div>
        <div className="  flex  items-center  gap-2 rounded-xl  px-2 py-2">
          <div>
            <HeaderLink
              Icon={MdNotifications}
              feed
              active={router.pathname.includes("/notification")}
              link="/notification"
            >
              Notifications
            </HeaderLink>
          </div>
          <Link
            href={`/profile/${session?.user?.uid}`}
            className=" cursor-pointer"
          >
            <Avatar size={40} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
