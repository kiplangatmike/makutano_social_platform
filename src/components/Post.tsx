import type { Post } from "$lib/types";
import { Fragment, type ReactNode, useState, useCallback } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  modalPostState,
  modalState,
  modalState2,
  modalTypeState,
} from "$lib/atoms";
import Avatar from "$components/Avatar";
import { IconType } from "react-icons";

export default function Post({ post, modalPost = false }: Props) {
  const [liked, setLiked] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const setModalOpen = useSetAtom(modalState);
  const setModalOpen2 = useSetAtom(modalState2);
  const setModalType = useSetAtom(modalTypeState);
  const setModalPost = useSetAtom(modalPostState);

  return (
    <div
      className={clsx(
        !modalPost && "feed-card rounded-3xl",
        modalPost && "rounded-r-lg"
      )}
    >
      <header className="mb-2 flex flex-nowrap items-center justify-between px-4 pt-3">
        <Link href="/profile" className="flex items-center">
          <span className="flex cursor-pointer">
            <Avatar size={40} />
          </span>
          <div className="ml-2 flex-grow leading-5">
            <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
              {post?.author?.name}
            </p>
            {post?.createdAt && (
              <p className="t-secondary text-xs">
                {formatDistanceToNow(parseISO(post?.createdAt as string), {
                  addSuffix: true,
                })}{" "}
              </p>
            )}
          </div>
        </Link>

        {modalPost ? (
          <button
            onClick={() => setModalOpen(false)}
            className="card-btn -mt-2 self-start rounded-xl p-1"
          >
            <MdClose className="mui-icon" />
          </button>
        ) : (
          <PostMenu post={post} />
        )}
      </header>

      <Link href="/onepost">
        {post?.input && (
          <article
            className={clsx(
              "relative mx-4 mb-2  overflow-hidden break-words text-sm leading-5",
              showAll && "max-h-[none]",
              modalPost && "max-h-72 overflow-y-auto"
            )}
          >
            <p className="">{post?.input}</p>
            <div className="my-1 overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1680178441861-c9539e92434f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1216&q=80"
                width={550}
                height={280}
                alt=""
              ></Image>
            </div>
            {!modalPost && !showAll && post?.input?.length > 220 && (
              <button
                onClick={() => setShowAll(true)}
                className="t-secondary hover:t-blue dark:text-t-blue-light absolute -bottom-1 right-0 inline-block bg-white pl-2 hover:underline dark:bg-dblue"
              >
                ...see more
              </button>
            )}
          </article>
        )}

        {post?.photoUrl && !modalPost && (
          <button
            onClick={() => {
              setModalOpen(true);
              setModalType("gifYouUp");
              setModalPost(post);
            }}
            className="my-4 block w-full"
          >
            <Image
              src={post.photoUrl}
              alt={post.input}
              width={556}
              height={556}
              priority
              className="max-h-[556px] object-contain"
            />
          </button>
        )}
      </Link>

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
      <div className=" ml-3 flex gap-3">
        <div>
          <Avatar size={30} />
        </div>
        <div className="relative mb-2 mr-4 grow rounded-3xl">
          <form className="mr-0">
            <input
              className=" block h-8 w-full overflow-hidden rounded-3xl px-4 outline-none"
              placeholder="Leave a comment"
            />
          </form>
          <button className="absolute right-4 top-1 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  post: Post;
  modalPost?: boolean;
};

const PostMenu = ({ post }: { post: Props["post"] }) => {
  const client = useQueryClient();

  const { data: session } = useSession();
  const setModalOpen = useSetAtom(modalState);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeletePost = useCallback(async () => {
    console.log("results");
  }, [post, session?.user?.uid]);

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
          <MenuButton Icon={MdEdit}>Edit post</MenuButton>
          <MenuButton
            onClick={onDeletePost}
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

const CommentsButton = ({ post }: { post: Props["post"] }) => {
  const comments = ["hello, how you", "ill be visiting", "congratulations"];
  const client = useQueryClient();
  // const { mutate } = useMutation(deletePost, {
  //   onMutate: () => setIsDeleting(true),
  //   onSuccess: (deletedPost) => {
  //     setModalOpen(false);
  //     client.setQueryData<Post[]>(["posts"], (posts) =>
  //       posts ? posts.filter((p) => p.id !== deletedPost.id) : []
  //     );
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     alert(error);
  //   },
  //   onSettled: () => {
  //     setIsDeleting(false);
  //   },
  // });
  const { data: session } = useSession();
  const setModalOpen2 = useSetAtom(modalState2);
  // const [isDeleting, setIsDeleting] = useState(false);

  // const onDeletePost = useCallback(async () => {
  //   console.log("results");
  // }, [mutate, post, session?.user?.uid]);

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
        <div className="px-5 py-2">
          <h2>comments</h2>
          <form className="flex flex-col">
            <label>Leave a comment</label>
            <input
              className="rounded-sm px-2 py-1"
              placeholder="type"
              title="comment"
            ></input>
          </form>
          {comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </div>
      </Transition>
    </Menu>
  );
};

const CommentButton = ({
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

type CommentButtonProps = {
  children: ReactNode;
  Icon: IconType;
  disabled?: boolean;
  onClick?: () => void;
};
