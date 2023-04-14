import { useQuery } from "@tanstack/react-query";
import { MdArrowDropDown } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { fetchPosts } from "$lib/utils";
import OnePost from "$components/Post";
import { Post } from "$lib/types";

export default function Feed() {
  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery(["posts"], fetchPosts, {
    staleTime: 60000,
  });
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className=" relative  w-full pb-6 ">
      {posts && posts?.length > 0 && (
        <div className="">
          <button className="flex w-full cursor-pointer items-center">
            <hr className="mr-2 h-[1px] flex-grow border-t border-black/10 bg-black/10 dark:border-gray-500 dark:bg-gray-500" />
            <div className="flex items-center">
              <span className="t-secondary text-xs">Sort by</span>
              <span className="mx-1 text-xs font-semibold">Top</span>
              <MdArrowDropDown size={20} className="-ml-1" />
            </div>
          </button>
        </div>
      )}
      <div ref={parent} className="space-y-4">
        {isLoading && <p>loading...</p>}
        {isError && error instanceof Error && <p>Error: {error?.message}</p>}
        {posts?.length === 0 && <p>No posts found</p>}
        {posts?.map((p: Post) => (
          <OnePost key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
