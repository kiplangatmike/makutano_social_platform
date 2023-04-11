import type { Article } from "$lib/types";
import { useState } from "react";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdCircle } from "react-icons/md";

import { articlesState } from "$lib/atoms";

export default function Widgets() {
  const articles = useAtomValue(articlesState);

  return (
    <div className="feed-card  rounded-3xl py-3">
      <div className="flex items-center px-3">
        <h4 className="flex-grow text-center font-semibold">Program Updates</h4>
        <BsInfoSquareFill className="mui-icon h-6 w-4" />
      </div>

      <ul className="pb-8">
        {articles?.map((a, index) => (
          <Item key={index} article={a} />
        ))}
      </ul>
    </div>
  );
}

const Item = ({ article: a }: { article: Article }) => (
  <li>
    <div className="card-btn m-2 block rounded-3xl bg-black py-3 pl-1 pr-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <MdCircle className="mui-icon t-secondary mx-3 mr-1 h-2 w-2 rounded-full" />
          <p className="block max-w-[480px] truncate text-sm font-semibold lg:max-w-[260px]">
            {a.title}
          </p>
        </div>

        <p className="block h-max max-w-[480px] py-1 text-xs lg:max-w-[260px]">
          {a.description}
        </p>
      </div>
      <span className="block w-full truncate pl-4 text-xs font-bold text-white">
        {formatDistanceToNow(parseISO(a.postedAt), {
          addSuffix: true,
        })}
      </span>
    </div>
  </li>
);
