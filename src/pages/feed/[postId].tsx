import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import { Comment, Post } from "$lib/types";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { HiOutlineReply } from "react-icons/hi";

import { modalState, modalState2 } from "$lib/atoms";

import clsx from "clsx";

import { formatDistanceToNow, parseISO } from "date-fns";
import toaster from "$lib/utils/toaster";

import { useSetAtom } from "jotai";

import {
  useCommentPostMutation,
  useGetCommentsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "$services/baseApiSlice";
import { useSession } from "next-auth/react";

export default function OnePost({ data }: { data: Post }) {
  const [comment, setComment] = useState("");

  const id = data?.id;
  const { data: comments, refetch } = useGetCommentsQuery(id, {
    skip: !id,
  });

  const [createComment] = useCommentPostMutation();

  const { data: session } = useSession();

  const commentHandler = async (e: any) => {
    e.preventDefault();
    const userId = session?.user?.uid;
    const id = data?.id;

    const body = {
      comment,
      userId,
      id,
    };
    await createComment(body)
      .unwrap()
      .then(() => {
        console.log("commented");
        setComment("");
        toaster({
          status: "success",
          message: "Comment posted!",
        });
        refetch();
      })
      .catch((error) => {
        console.log(error);
        toaster({
          status: "error",
          message: error?.message ?? "Error while commenting. Try again later",
        });
      });
  };

  const [likeAction] = useLikePostMutation();
  const [unlikeAction] = useUnlikePostMutation();

  const [localPostContent, setLocalPostContent] = useState(data);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLocalPostContent(data);
  }, [data]);

  const likePost = async () => {
    if (localPostContent?.likes?.includes(session?.user?.uid as string)) return;
    const userId = session?.user?.uid;
    const postId = localPostContent?.id;
    await likeAction({ userId, postId })
      .unwrap()
      .then((payload) => {
        console.log("liked");
        setLiked(true);
        setLocalPostContent(payload as Post);
      })
      .catch((error) => {
        console.log(error);
        toaster({
          status: "error",
          message: error?.message ?? "Error while liking. Try again later",
        });
      });
  };

  const unlikePost = async () => {
    if (!localPostContent?.likes?.includes(session?.user?.uid as string))
      return;
    const userId = session?.user?.uid;
    const postId = localPostContent?.id;
    await unlikeAction({ userId, postId })
      .unwrap()
      .then((payload) => {
        console.log("unliked");
        setLiked(false);
        setLocalPostContent(payload as Post);
      })
      .catch((error) => {
        console.log(error);
        toaster({
          status: "error",
          message: error?.message ?? "Error while unliking. Try again later",
        });
      });
  };

  const setModalOpen = useSetAtom(modalState);
  const setModalOpen2 = useSetAtom(modalState2);

  const openShareModal = async () => {
    try {
      const shareData = {
        title: "Share this post",
        text: "Check this post from Makutatano!",
        url: window.location.href,
      };
      await navigator.share(shareData);
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      toaster({
        status: "success",
        message: "Copied to clipboard",
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Post by {data?.author?.name}</title>
      </Head>
      <div className=" dark:bg-gray-900 relative mx-auto mt-0 flex w-full flex-col gap-3 rounded-3xl bg-gray-900 px-3 py-3 pb-6 xl:w-[40vw] 2xl:w-[50vw]">
        <Link href={`/profile/${data?.authorId}`} className="flex">
          <span className=" cursor-pointer">
            <Avatar src={data?.author?.image as string} size={40} />
          </span>
          <div className="ml-2 flex-grow leading-5">
            <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
              {data?.author?.name}
            </p>
            {data?.createdAt && (
              <p className="t-secondary text-xs">
                {formatDistanceToNow(parseISO(data?.createdAt as string), {
                  addSuffix: true,
                })}{" "}
              </p>
            )}
          </div>
        </Link>
        <article className="mb-2 pl-4">{data?.input}</article>
        <div className="my-1 flex w-full justify-between gap-3 border-t border-black/10 px-4	py-3 text-black/60 dark:border-gray-500">
          <button
            className={clsx(
              "card-btn rounded-xl text-white ",
              liked && "text-blue-500"
            )}
            onClick={() => {
              localPostContent?.likes?.includes(session?.user?.uid as string)
                ? unlikePost()
                : likePost();
            }}
          >
            {!localPostContent?.likes?.includes(
              session?.user?.uid as string
            ) ? (
              <AiOutlineHeart className="mui-icon -scale-x-100 first-line:w-[25px] " />
            ) : (
              <AiTwotoneHeart
                color="#f40101"
                className="mui-icon w-[25px] -scale-x-100"
              />
            )}
            <span className="ml-1 text-white">
              {localPostContent?.likes?.length}
            </span>
          </button>

          <button
            onClick={() => setModalOpen2(false)}
            className="card-btn rounded-xl text-white"
          >
            <BiComment className="mui-icon w-[23px] -scale-x-100" />
            <span className="ml-1 text-white">{comments?.length ?? 0}</span>
          </button>

          <button
            onClick={() => openShareModal()}
            className="card-btn rounded-xl text-white"
          >
            <HiOutlineReply className="mui-icon w-[23px] -scale-x-100" />
          </button>
        </div>
        <div className="flex w-full flex-col rounded-md bg-black/50">
          <div className="my-3 ml-3 flex items-center gap-3">
            <div>
              <Avatar size={30} />
            </div>
            <div className="relative mr-4 grow rounded-3xl">
              <form className="mr-0">
                <textarea
                  className="block h-12 w-full resize-none overflow-hidden rounded-3xl border border-white/30 bg-transparent px-4 outline-none transition-all duration-300 ease-in focus:h-16 focus:border-none focus:border-white focus:outline-none"
                  placeholder="Leave a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </form>
              <button
                onClick={(e) => commentHandler(e)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
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
          <div className="my-2 mt-1 flex flex-col items-start gap-3 rounded-xl p-2">
            {comments?.length === 0 && (
              <p className="t-secondary w-full text-center text-xs">
                No comments yet
              </p>
            )}
            {comments?.map((comment: Comment) => (
              <div
                key={comment.id}
                className="flex w-full flex-col gap-2 rounded-lg bg-white/5 px-2 py-2"
              >
                <Link href={`/profile/${comment?.authorId}`} className="flex">
                  <span className=" cursor-pointer">
                    <Avatar src={comment?.author?.image as string} size={30} />
                  </span>
                  <div className="ml-2 flex-grow leading-5">
                    <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light text-sm font-semibold text-black/90">
                      {comment?.author?.name}
                    </p>
                    {comment?.createdAt && (
                      <p className="t-secondary text-xs">
                        {formatDistanceToNow(new Date(comment?.createdAt), {
                          addSuffix: true,
                        })}{" "}
                      </p>
                    )}
                  </div>
                </Link>

                <p className="t-secondary text-md">{comment.input}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}posts`
    );
    const paths = res.data.map((post: Post) => ({
      params: {
        postId: post.id.toString(),
      },
    }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// get post by id - `/posts/:post` for getStaticProps
export const getStaticProps = async ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}posts/${params.postId}`
    );
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
