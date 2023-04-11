import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Link from "next/link";
import { UrlObject } from "url";

const Avatar = dynamic(() => import("$components/Avatar"));

export default function HeaderLink({
  children,
  Icon,
  avatar = false,
  feed = false,
  active = false,
  hidden = false,
  link,
}: Props) {
  return (
    <Link
      href={link}
      className={clsx(
        "flex cursor-pointer flex items-center justify-center  px-3 py-2 rounded-xl gap-1",
        feed && "t-secondary hover:text-black dark:hover:text-white",
        !feed && "text-gray-500 hover:text-gray-700",
        hidden && "hidden md:inline-flex",
        active && " bg-[#2a3238]"
      )}
    >
      {avatar ? (
        <Avatar size={24} />
      ) : Icon ? (
        <Icon className="mui-icon" />
      ) : null}

      <h4
        className={clsx(
          "text-sm",
          feed && "mx-auto hidden w-full justify-center lg:flex"
        )}
      >
        {children}
      </h4>

      {/* {active && (
        <span className="hidden h-0.5 w-[calc(100%+20px)] rounded-t-full bg-black dark:bg-white lg:inline-flex" />
      )} */}
      
    </Link>
  );
}

type Props = {
  Icon?: React.FC<{ className: string }>;
  avatar?: boolean;
  children: ReactNode;
  feed?: boolean;
  active?: boolean;
  hidden?: boolean;
  link: string;
};
