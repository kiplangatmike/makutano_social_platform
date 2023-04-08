import type { Article } from "$lib/types";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdCircle } from "react-icons/md";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

import { articlesState } from "$lib/atoms";

export default function Widgets() {
  const articles = useAtomValue(articlesState);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="feed-card rounded-3xl py-3">
      <div className="flex items-center px-3">
        <h4 className="flex-grow text-center font-semibold">Program Updates</h4>
        <BsInfoSquareFill className="mui-icon h-6 w-4" />
      </div>

      <ul
      // className={clsx(
      //   "my-2 transition-all",
      //   showMore ? "h-[476px]" : "h-[266px]"
      // )}
      >
        {articles.slice(0, 2).map((a) => (
          <>
            <Item key={a.url} article={a} />
          </>
        ))}
        {showMore &&
          articles.slice(5, 10).map((a) => (
            <>
              <Item key={a.url} article={a} />
            </>
          ))}
      </ul>

      <button
        onClick={() => setShowMore((p) => !p)}
        className="t-secondary ml-6 flex items-center space-x-1 rounded bg-gray-700 px-2 py-0.5"
      >
        <span className="text-sm font-semibold">
          {showMore ? "Show less" : "Show more"}
        </span>
        {showMore ? (
          <HiOutlineChevronUp className="mui-icon h-5 w-5" />
        ) : (
          <HiOutlineChevronDown className="mui-icon h-5 w-5" />
        )}
      </button>
    </div>
  );
}

const Item = ({ article: a }: { article: Article }) => (
  <li>
    <a
      href={a.url}
      className="card-btn m-2 block rounded-3xl bg-black py-3 pl-1 pr-4"
      rel="noreferrer noopener"
      target="_blank"
    >
      <div className="flex items-center">
        <MdCircle className="mui-icon t-secondary mx-3 h-2 w-2 rounded-full" />
        <p className="block max-w-[480px] truncate text-sm font-semibold lg:max-w-[260px]">
          {a.title}
        </p>
      </div>
      <span className="t-secondary block w-full truncate pl-8 text-xs">
        {formatDistanceToNow(parseISO(a.publishedAt), {
          addSuffix: true,
        })}
      </span>
      <div className="my-2 ml-3 overflow-hidden rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1507537509458-b8312d35a233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          width={280}
          height={280}
          alt=""
        ></Image>
      </div>
    </a>
  </li>
);
