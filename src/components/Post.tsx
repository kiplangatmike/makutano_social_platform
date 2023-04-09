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
import { useQueryClient } from "@tanstack/react-query";

import {
  modalPostState,
  modalState,
  modalState2,
  modalTypeState,
} from "$lib/atoms";
import Avatar from "$components/Avatar";
import { IconType } from "react-icons";
import axios from "axios";
import { useDeletePostMutation } from "$services/baseApiSlice";
import { Post } from "$lib/types";

export default function OnePost({ post, modalPost = false }: Props) {
  const [liked, setLiked] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const setModalOpen = useSetAtom(modalState);
  const setModalOpen2 = useSetAtom(modalState2);
  const setModalType = useSetAtom(modalTypeState);
  const setModalPost = useSetAtom(modalPostState);

  const { data: session } = useSession();

  return (
    <div
      className={clsx(
        !modalPost && "feed-card mx-[350px] rounded-3xl",
        modalPost && "rounded-r-lg"
      )}
    >
      <header className="mb-2 flex flex-nowrap items-center justify-between px-4 pt-3 ">
        <Link href="/profile" className="flex items-center">
          <span className="flex cursor-pointer">
            <Avatar src={post?.author?.image as string} size={40} />
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
            onClick={() => {
              if (post.authorId === session?.user?.uid) {
                setModalOpen(false);
              }
            }}
            className="card-btn -mt-2 self-start rounded-xl p-1"
          >
            <MdClose className="mui-icon" />
          </button>
        ) : session?.user?.uid === post?.authorId ? (
          <PostMenu post={post} />
        ) : null}
      </header>

      <Link href={`/feed/${post?.id}`}>
        {post?.input && (
          <article
            className={clsx(
              "relative mx-4 mb-2 overflow-hidden break-words text-sm leading-5",
              showAll && "max-h-[none]",
              modalPost && "max-h-72 overflow-y-auto"
            )}
          >
            <p className="mb-4">{post?.input}</p>
            {post?.media?.length > 0 && (
              <div className="relative my-1 h-[200px] w-full overflow-hidden rounded-xl">
                <Image
                  src={post?.media[0]}
                  fill
                  alt=""
                  className="object-contain"
                ></Image>
              </div>
            )}
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

      <div className="my-1 flex w-full justify-between gap-3 border-t border-black/10 px-4	py-3 text-black/60 dark:border-gray-500">
        <button
          className={clsx(
            "card-btn rounded-xl text-white ",
            liked && "text-blue-500"
          )}
          onClick={() => setLiked((p) => !p)}
        >
          {liked ? (
            <AiOutlineHeart className="mui-icon -scale-x-100 first-line:w-[25px] " />
          ) : (
            <AiTwotoneHeart className="mui-icon w-[25px] -scale-x-100" />
          )}
          <span className="ml-1 text-white">10</span>
        </button>

        <button
          onClick={() => setModalOpen2(false)}
          className="card-btn rounded-xl text-white"
        >
          <BiComment className="mui-icon w-[23px] -scale-x-100" />
          <span className="ml-1 text-white">10</span>
        </button>

        <button className="card-btn rounded-xl text-white">
          <HiOutlineReply className="mui-icon w-[23px] -scale-x-100" />
        </button>
      </div>
      <div className=" mb-3 ml-3 flex items-center gap-3">
        <div>
          <Avatar size={30} />
        </div>
        <div className="relative mr-4 grow rounded-3xl">
          <form className="mr-0">
            <input
              className=" block h-12 w-full overflow-hidden rounded-3xl px-4 outline-none"
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
          <MenuButton Icon={MdEdit}>Edit post</MenuButton>
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
