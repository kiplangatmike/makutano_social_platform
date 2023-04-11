import type { Article } from "$lib/types";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdCircle } from "react-icons/md";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import james from "../../assests/equity.jpg"

import { articlesState } from "$lib/atoms";

export default function Widgets() {
  const articles = useAtomValue(articlesState);
  const [showMore, setShowMore] = useState(true);

  return (
    <div className="feed-card  rounded-3xl py-3">
      <div className="flex items-center px-3">
        <h4 className="flex-grow text-center font-semibold">Program Updates</h4>
        <BsInfoSquareFill className="mui-icon h-6 w-4" />
      </div>

      <ul className="pb-8">
        {articles.map((a, index) => (
          <Item key={index} article={a} />
        ))}
      </ul>
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
          src={james}
          width={280}
          height={280}
          alt=""
        ></Image>
      </div>
    </a>
  </li>
);
