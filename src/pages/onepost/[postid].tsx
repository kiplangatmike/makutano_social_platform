import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Comments from "$components/comments";
import { modalState2 } from "$lib/atoms";
import Image from "next/image";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { HiOutlineReply } from "react-icons/hi";

export default function OnePost(id: number) {
  const [liked, setLiked] = useState(false);
  const setModalOpen2 = useSetAtom(modalState2);

  return (
    <Layout>
      <div className="">
        <div className="feed-card rounded-3xl ">
          <Link href="/profile" className="flex p-3">
            <span className=" cursor-pointer">
              <Avatar size={40} />
            </span>
            <div className="ml-2 flex-grow leading-5">
              <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
                Liplan Lekipising
              </p>
              {/* {post?.createdAt && (
              <p className="t-secondary text-xs">
                {formatDistanceToNow(parseISO(post?.createdAt as string), {
                  addSuffix: true,
                })}{" "}
              </p>
            )} */}
              08/04/2023
            </div>
          </Link>
          <div className="relative  mb-2 overflow-hidden rounded-3xl px-3">
            <Image
              src="https://images.unsplash.com/photo-1680178441861-c9539e92434f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1216&q=80"
              width={550}
              height={280}
              alt=""
            ></Image>
          </div>
          <div className="mx-4 my-1 border-t border-black/10	py-1 text-black/60 dark:border-gray-500">
            <button
              className={clsx(
                "card-btn rounded-xl text-white ",
                liked && "text-blue-500"
              )}
              onClick={() => setLiked((p) => !p)}
            >
              {liked ? (
                <AiOutlineHeart className="mui-icon mx-4 -scale-x-100 first-line:w-[25px] " />
              ) : (
                <AiTwotoneHeart className="mui-icon mx-4 w-[25px] -scale-x-100" />
              )}
            </button>
            <span className="text-white">10</span>
            <button
              onClick={() => setModalOpen2(false)}
              className="card-btn rounded-xl text-white"
            >
              <BiComment className="mui-icon mx-4 w-[23px] -scale-x-100" />
            </button>
            <span className="text-white">10</span>
            <button className="card-btn rounded-xl text-white">
              <HiOutlineReply className="mui-icon mx-4 w-[23px] -scale-x-100" />
            </button>
            <span className="text-white">10</span>
          </div>
        </div>
        <Comments />
      </div>
    </Layout>
  );
}
