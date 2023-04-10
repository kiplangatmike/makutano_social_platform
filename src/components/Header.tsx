import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  MdApps,
  MdBusinessCenter,
  MdChat,
  MdGroup,
  MdHome,
  MdNotifications,
  MdSearch,
} from "react-icons/md";
import { TbBrandGoogleHome } from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import HeaderLink from "$components/HeaderLink";
import linkedin_icon from "$public/linkedin_icon.png";
import linkedin_icon_white from "$public/linkedin_icon_white.png";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="t-primary sticky top-0 z-10 bg-white px-4 focus-within:shadow dark:bg-dblue">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-1">
        {/* Left */}
        <div className="flex w-full max-w-xs items-center space-x-2">
          <Link href="/feed" className="flex">
            {resolvedTheme === "dark" ? (
              <Image
                src={linkedin_icon_white}
                alt="LinkedIn logo"
                width={34}
                height={34}
              />
            ) : (
              <Image
                src={linkedin_icon}
                alt="LinkedIn logo"
                width={34}
                height={34}
              />
            )}
          </Link>

          <div className="relative rounded md:w-full">
            <div className="grid place-items-center pl-3 md:absolute md:inset-y-0">
              <MdSearch className="mui-icon t-secondary hover:t-black dark:hover:t-white cursor-pointer md:pointer-events-none md:h-5 md:w-5" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="hidden h-8 w-full rounded border-none bg-slate-100 pl-10 text-sm dark:bg-gray-700 md:inline-block"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 space-x-6 py-1">
          <HeaderLink Icon={TbBrandGoogleHome} feed active link="/feed">
            Home
          </HeaderLink>
          <HeaderLink Icon={SlPeople} feed link="/chapters">
            Chapters
          </HeaderLink>
          <HeaderLink Icon={MdBusinessCenter} feed hidden link="/network">
            Opportunities
          </HeaderLink>
          <HeaderLink Icon={MdNotifications} feed link="/notification">
            Notifications
          </HeaderLink>
          <HeaderLink feed avatar hidden link="/profile/12">
            Me
          </HeaderLink>

          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className={clsx(
                "relative flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-600 px-0.5",
                resolvedTheme === "dark" ? "justify-end" : "justify-start"
              )}
            >
              <span className="absolute left-0.5">🌜</span>
              <motion.div
                className="z-40 h-5 w-5 rounded-full bg-white"
                layout
                transition={spring}
              />
              <span className="absolute right-1">🌞</span>
            </button>
          )}
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
