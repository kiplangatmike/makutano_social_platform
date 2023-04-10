import CommentSection from "$components/CommentSection";
import Layout from "$components/Layout";
import Comments from "$components/comments";
import { Avatar } from "@mui/material";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { HiOutlineReply } from "react-icons/hi";

export default function SinglePost() {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="feed-card mb-2 items-center rounded-3xl px-4 pt-3">
        <Link href="/profile" className="flex items-center">
          <div className="mb-3 h-[40px] w-[40px] cursor-pointer rounded-full bg-white"></div>
          <div className="ml-2 flex-grow leading-5">
            <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
              {/* {localPostContent?.author?.name} */}
              Mike Kiplangat
            </p>
            {/* {localPostContent?.createdAt && (
              <p className="t-secondary text-xs">
                {formatDistanceToNow(
                  parseISO(localPostContent?.createdAt as string),
                  {
                    addSuffix: true,
                  }
                )}{" "}
              </p>
            )} */}
            02/5/2023
          </div>
        </Link>
        <div className="mb-4 h-full overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
            width={1000}
            height={1000}
          ></Image>
        </div>
        <div className="my-1 flex w-full justify-between gap-3 border-t border-black/10 px-4	py-3 text-black/60 dark:border-gray-500">
          <button
            className={clsx(
              "card-btn rounded-xl text-white ",
              liked && "text-blue-500"
            )}
            //   onClick={() => {
            //     localPostContent?.likes?.includes(session?.user?.uid as string)
            //       ? unlikePost()
            //       : likePost();
            //   }}
          >
            {/* !localPostContent?.likes?.includes(session?.user?.uid as string) */}
            {liked ? (
              <AiOutlineHeart className="mui-icon -scale-x-100 first-line:w-[25px] " />
            ) : (
              <AiTwotoneHeart
                color="#f40101"
                className="mui-icon w-[25px] -scale-x-100"
              />
            )}
            <span className="ml-1 text-white">
              {/* {localPostContent?.likes?.length} */}
            </span>
          </button>

          <button
            //   onClick={() => setModalOpen2(false)}
            className="card-btn rounded-xl text-white"
          >
            <BiComment className="mui-icon w-[23px] -scale-x-100" />
            {/* <span className="ml-1 text-white">{commentIds?.length ?? 0}</span> */}
          </button>

          <button
            //   onClick={() => openShareModal()}
            className="card-btn rounded-xl text-white"
          >
            <HiOutlineReply className="mui-icon w-[23px] -scale-x-100" />
          </button>
        </div>
        <div className=" mb-3 ml-3 flex items-center gap-3">
          <div>
            <div className="mb-3 h-[35px] w-[35px] cursor-pointer rounded-full bg-white"></div>
          </div>
          <div className="relative mr-4 grow rounded-3xl">
            <form className="mr-0">
              <textarea
                className="block h-12 w-full resize-none overflow-hidden rounded-3xl border border-white/30 bg-transparent px-4 outline-none transition-all duration-300 ease-in focus:h-16 focus:border-none focus:border-white focus:outline-none"
                placeholder="Leave a comment"
              />
            </form>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Comments />
    </Layout>
  );
}
