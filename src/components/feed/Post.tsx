import { useCallback } from "react";

import { Fragment, type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Menu, Transition } from "@headlessui/react";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { HiOutlineReply } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

import { motion } from "framer-motion";

import {
  modalPostState,
  modalState,
  modalState2,
  modalTypeState,
} from "$lib/atoms";
import Avatar from "$components/common/Avatar";
import { IconType } from "react-icons";
import {
  useCommentPostMutation,
  useDeletePostMutation,
  useGetCommentsCountQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "$services/baseApiSlice";
import { Post } from "$lib/types";
import toaster from "$lib/utils/toaster";

export default function OnePost({ post, index, modalPost = false }: Props) {
  const [liked, setLiked] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const setModalOpen = useSetAtom(modalState);
  const setModalOpen2 = useSetAtom(modalState2);

  const { data: session } = useSession();

  const [likeAction] = useLikePostMutation();
  const [unlikeAction] = useUnlikePostMutation();

  const [localPostContent, setLocalPostContent] = useState(post);

  useEffect(() => {
    setLocalPostContent(post);
  }, [post]);

  const likePost = async () => {
    if (localPostContent?.likes?.includes(session?.user?.uid as string)) return;
    const userId = session?.user?.uid;
    const postId = localPostContent?.id;
    await likeAction({ userId, postId })
      .unwrap()
      .then((payload) => {
        setLiked(true);
        setLocalPostContent(payload as Post);
      })
      .catch((error) => {
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
        setLiked(false);
        setLocalPostContent(payload as Post);
      })
      .catch((error) => {
        toaster({
          status: "error",
          message: error?.message ?? "Error while unliking. Try again later",
        });
      });
  };

  const [comment, setComment] = useState("");

  const id = localPostContent?.id;
  const { data: commentIds } = useGetCommentsCountQuery(id, {
    skip: !id,
  });

  const [createComment] = useCommentPostMutation();

  const commentHandler = async (e: any) => {
    e.preventDefault();
    const userId = session?.user?.uid;
    const id = localPostContent?.id;

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
      })
      .catch((error) => {
        console.log(error);
        toaster({
          status: "error",
          message: error?.message ?? "Error while commenting. Try again later",
        });
      });
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1, ease: "easeIn" }}
      viewport={{ once: true }}
      className={clsx(
        !modalPost && "rounded-3xl  shadow-md dark:bg-gray-900",
        modalPost && "rounded-r-lg"
      )}
    >
      <header className="mb-2 flex flex-nowrap items-center justify-between px-4 pt-3">
        <Link
          href={`/profile/${localPostContent?.authorId}`}
          className="flex items-center capitalize"
        >
          <span className="flex cursor-pointer">
            <Avatar src={localPostContent?.author?.image as string} size={40} />
          </span>
          <div className="ml-2 flex-grow leading-5">
            <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
              {localPostContent?.author?.name}
            </p>
            {localPostContent?.createdAt && (
              <p className="t-secondary text-xs">
                {formatDistanceToNow(
                  parseISO(localPostContent?.createdAt as string),
                  {
                    addSuffix: true,
                  }
                )}{" "}
              </p>
            )}
          </div>
        </Link>

        {modalPost ? (
          <button
            onClick={() => {
              if (localPostContent.authorId === session?.user?.uid) {
                setModalOpen(false);
              }
            }}
            className="card-btn -mt-2 self-start rounded-xl p-1"
          >
            <MdClose className="mui-icon" />
          </button>
        ) : session?.user?.uid === localPostContent?.authorId ? (
          <PostMenu post={localPostContent} />
        ) : null}
      </header>

      <Link href={`/feed/${localPostContent?.id}`}>
        {localPostContent?.input && (
          <article
            className={clsx(
              "relative mx-4 mb-2 overflow-hidden break-words text-sm leading-5",
              showAll && "max-h-[none]",
              modalPost && "max-h-72 overflow-y-auto"
            )}
          >
            <article className="mb-4">
              {localPostContent?.input
                ?.slice(0, 220)
                .split("\n")
                ?.map((txt, i) => (
                  <p key={i} className="t-body text-black/90 dark:text-white">
                    {txt}
                  </p>
                ))}
              {!modalPost &&
                !showAll &&
                localPostContent?.input?.length > 220 && (
                  <span
                    onClick={() => setShowAll(true)}
                    className="t-secondary bg-white pl-2 hover:underline dark:bg-dblue dark:text-amber-400"
                  >
                    ...see more
                  </span>
                )}
            </article>
            {localPostContent?.media?.length > 0 && (
              <div className="relative my-1 h-[200px] w-full overflow-hidden rounded-xl">
                <Image
                  src={localPostContent?.media[0]}
                  fill
                  alt=""
                  className="object-contain"
                ></Image>
              </div>
            )}
          </article>
        )}
      </Link>

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
          {!localPostContent?.likes?.includes(session?.user?.uid as string) ? (
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
          className="card-btn rounded-xl text-white "
        >
          <BiComment className="mui-icon w-[23px] -scale-x-100" />
          <span className="ml-1 text-white">{commentIds?.length ?? 0}</span>
        </button>

        <button
          onClick={() => openShareModal()}
          className="card-btn rounded-xl text-white"
        >
          <HiOutlineReply className="mui-icon w-[23px] -scale-x-100" />
        </button>
      </div>
      <div className=" mb-3 ml-3 flex items-center gap-3">
        <div>
          <Avatar size={30} />
        </div>
        <div className="relative mr-4 grow rounded-3xl pb-3">
          <form className="mr-0">
            <textarea
              className="block h-12 w-full resize-none overflow-hidden rounded-xl border border-white/30 bg-transparent px-4 outline-none transition-all duration-300 ease-in focus:h-16 focus:border-none focus:border-white focus:outline-none"
              placeholder="Leave a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <button
            onClick={(e) => commentHandler(e)}
            className="absolute right-4 top-[40%] -translate-y-1/2 text-gray-400"
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
    </motion.div>
  );
}

type Props = {
  post: Post;
  modalPost?: boolean;
  index: number;
};

const PostMenu = ({ post }: { post: Props["post"] }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const setModalOpen = useSetAtom(modalState);
  const setModalType = useSetAtom(modalTypeState);
  const setModalPost = useSetAtom(modalPostState);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalType("dropIn");
  }, [setModalOpen, setModalType]);

  const [deletePost] = useDeletePostMutation();

  const queryClient = useQueryClient();

  const onDeletePost = async (id: string) => {
    await deletePost(id)
      .unwrap()
      .then(() => {
        // remove post from cache
        queryClient.setQueryData(["posts"], (oldData) => {
          console.log(oldData);
          // @ts-ignore
          return oldData?.filter((p: Post) => p.id !== id);
        });
      })
      .catch((error) => {
        console.log(error);
        toaster({
          status: "error",
          message:
            error?.message ?? "Error while deleting post. Try again later.",
        });
      });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="card-btn -mt-2 self-start rounded-full p-1">
        <IoIosMore className="mui-icon" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="scale-90 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-150 ease-in"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-90 opacity-0"
      >
        <Menu.Items className="absolute right-0 top-10 z-40 flex w-48 origin-top-right flex-col items-stretch rounded-lg rounded-tr-none border bg-white py-1 shadow-lg outline-offset-2 dark:border-gray-500 dark:bg-dblue">
          <MenuButton
            onClick={() => {
              setModalOpen(true);
              setModalType("dropIn");
              setModalPost(post);
            }}
            Icon={MdEdit}
          >
            Edit post
          </MenuButton>
          <MenuButton
            onClick={() => onDeletePost(post.id)}
            Icon={MdDelete}
            disabled={isDeleting}
          >
            Delete post
          </MenuButton>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MenuButton = ({
  children,
  Icon,
  onClick,
  disabled = false,
}: MenuButtonProps) => (
  <Menu.Item disabled={disabled}>
    {({ active, disabled }) => (
      <button
        onClick={onClick}
        className={clsx(
          "card-btn t-secondary flex cursor-pointer items-center px-4 py-2 transition-colors duration-200",
          active && "bg-black/5 dark:bg-gray-100/10",
          disabled && "cursor-not-allowed text-black/40 dark:text-white/40"
        )}
      >
        <Icon size={20} className="" />
        <span className="ml-2 flex-grow text-left font-semibold">
          {children}
        </span>
      </button>
    )}
  </Menu.Item>
);

type MenuButtonProps = {
  children: ReactNode;
  Icon: IconType;
  disabled?: boolean;
  onClick?: () => void;
};
