import Layout from "$components/common/Layout";
import OnePost from "$components/feed/Post";
import { Post } from "$lib/types";
import {
  useGetChapterByIdQuery,
  useGetUserByIdQuery,
  useJoinOrLeaveChapterMutation,
} from "$services/baseApiSlice";
import { Chapters, ComprehensiveProfile, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import {
  Education as IEducation,
  Experience as IExperience,
} from "@prisma/client";

import { postForChapters, modalState, modalTypeState } from "$lib/atoms";

import { motion } from "framer-motion";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import toaster from "$lib/utils/toaster";
import { useRouter } from "next/router";
import HeaderSeo from "$components/common/head";
import Avatar from "$components/common/Avatar";
import Link from "next/link";

export default function ChapterView({
  data,
}: {
  data: Chapters & {
    posts: Post[];
    users: User[];
  };
}) {
  const id = data?.createdBy;

  const { data: creator } = useGetUserByIdQuery(id, {
    skip: !id,
  });

  const { data: session } = useSession();

  const [activeTab, setActiveTab] = React.useState<"posts" | "members">(
    "posts"
  );

  const [parent] = useAutoAnimate<HTMLDivElement>();

  const [joinOrLeaveAction, { isLoading }] = useJoinOrLeaveChapterMutation();

  const joinOrLeaveHandler = async () => {
    const body = {
      id: data.id,
      actionType: data.userIds?.includes(session?.user?.uid as string)
        ? "leave"
        : "join",
      userId: session?.user?.uid,
    };
    await joinOrLeaveAction(body)
      .unwrap()
      .then(() => {
        toaster({
          status: "success",
          message: `You have ${
            body.actionType === "join" ? "joined" : "left"
          } the chapter successfully`,
        });
      })
      .catch((error) => {
        console.log(error);
        toaster({
          status: "error",
          // @ts-ignore
          message: error ?? "Error occured. Try again later.",
        });
      });
  };

  const setIsForChapters = useSetAtom(postForChapters);

  const setModalOpen = useSetAtom(modalState);
  const setModalType = useSetAtom(modalTypeState);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalType("dropIn");
  }, [setModalOpen, setModalType]);

  const router = useRouter();

  const { refetchPosts } = router.query;

  const chapterId = data?.id;
  const { data: thisChapter, refetch } = useGetChapterByIdQuery(chapterId, {
    skip: !chapterId,
  });

  const [chapterPosts, setChapterPosts] = React.useState<Post[]>(data?.posts);
  const [chapterMembers, setChapterMembers] = React.useState<User[]>(
    data?.users
  );

  useEffect(() => {
    if (thisChapter) {
      setChapterPosts(thisChapter.posts);
      setChapterMembers(thisChapter.users);
    }
  }, [thisChapter]);

  useEffect(() => {
    if (refetchPosts) {
      refetch();
      router.replace("/chapters", undefined, { shallow: true });
    }
  }, [refetchPosts]);

  function JoinORLeaveButton({ fromMessage }: { fromMessage?: boolean }) {
    return (
      <button
        onClick={() => {
          if (fromMessage) {
            // either join or create post depending on if user is in chapter
            if (data?.userIds?.includes(session?.user?.uid as string)) {
              setIsForChapters(data.id);
              openModal();
              return;
            } else {
              joinOrLeaveHandler();
              return;
            }
          } else {
            joinOrLeaveHandler();
          }
        }}
        disabled={isLoading}
        className={`flex items-center justify-center gap-2 rounded-md px-8 py-2 text-base font-semibold md:-top-2 md:right-4 ${
          data?.userIds?.includes(session?.user?.uid as string) && !fromMessage
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } ${fromMessage ? "static mx-auto" : "absolute"}`}
      >
        {data?.userIds?.includes(session?.user?.uid as string) &&
        !fromMessage ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        )}

        {data?.userIds?.includes(session?.user?.uid as string)
          ? `${fromMessage ? "Create Post" : "Leave Chapter"}`
          : "Join Chapter"}
      </button>
    );
  }
  return (
    <>
      <HeaderSeo
        title={`${data?.name} - Makutano`}
        description={`Discover and engage with ${data?.name} on Makutano. Join the chapter and start sharing your thoughts and ideas.`}
        image={data?.image}
      />
      <Layout>
        <div className="relative mx-auto mt-0 w-full bg-black/10 pb-8 xl:w-[40vw] 2xl:w-[50vw]">
          <div className="rounded-tr-x3l relative h-[400px] w-full rounded-bl-3xl">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="rounded-bl-3xl rounded-tr-3xl object-cover object-center"
            />
          </div>
          <div className="relative mt-4 flex flex-col gap-2 px-4">
            <h1 className="text-2xl font-bold text-white">{data?.name}</h1>
            <p className="tetx-base font-medium text-white">
              {data?.description}
            </p>
            <JoinORLeaveButton />
          </div>

          <div className=" mx-4 mt-8 flex justify-between rounded-xl bg-blue-400/30 px-6 py-4">
            <p className="text-md">
              <span className="text-lg font-bold">{data?.userIds?.length}</span>{" "}
              Members
            </p>
            <p className="text-md">
              <span className="text-lg font-bold">
                {thisChapter?.postIds?.length ?? data?.postIds?.length}
              </span>{" "}
              Posts
            </p>
            <p className="text-md">
              Created by{" "}
              <span className="text-lg font-bold">
                {creator?.name?.split(" ")[0] ?? ""}
              </span>
            </p>
          </div>

          <div className="mx-4 mt-6 flex rounded-lg">
            <div
              onClick={() => setActiveTab("posts")}
              className={`w-1/2 cursor-pointer rounded-l-lg border-[1px] px-4 py-2 text-white transition-all duration-150 ease-in ${
                activeTab === "posts"
                  ? "border-blue-400/30 bg-blue-400/30"
                  : "border-r-0 border-blue-400/50 bg-transparent"
              }`}
            >
              <h2>Posts</h2>
            </div>
            <div
              onClick={() => setActiveTab("members")}
              className={`w-1/2 cursor-pointer rounded-r-lg border-[1px] px-4 py-2 text-white transition-all duration-150 ease-in ${
                activeTab === "members"
                  ? "border-blue-400/30 bg-blue-400/30"
                  : "border-l-0 border-blue-400/50 bg-transparent"
              }`}
            >
              <h2>Members</h2>
            </div>
          </div>

          {activeTab === "posts" && (
            <div ref={parent} className="mt-8 space-y-4 px-4">
              {chapterPosts?.length === 0 && (
                <div className="flex flex-col gap-2 px-4 text-center">
                  <p>This chapter does not have any posts</p>
                  <JoinORLeaveButton fromMessage />
                </div>
              )}
              {chapterPosts?.map((p: Post, index: number) => (
                <OnePost key={p.id} post={p} index={index} />
              ))}
            </div>
          )}

          {activeTab === "members" && (
            <div ref={parent} className="mt-8 space-y-4 px-4">
              {chapterMembers?.length === 0 && (
                <div className="flex flex-col gap-2 px-4 text-center">
                  <p>This chapter does not have any posts</p>
                  <JoinORLeaveButton fromMessage />
                </div>
              )}
              {chapterMembers?.map((m: any, index: number) => (
                <OneMember key={m.id} member={m} index={index} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

function OneMember({
  member,
  index,
}: {
  member: User & {
    posts: Post[];
    ComprehensiveProfile: ComprehensiveProfile[];
    education: IEducation[];
    experience: IExperience[];
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1, ease: "easeIn" }}
      viewport={{ once: true }}
      className={
        "flex w-full cursor-default items-center justify-between gap-4 rounded-3xl px-4 py-6 shadow-md dark:bg-gray-900"
      }
    >
      <div className="flex w-full gap-4">
        <div className="min-w-[50px]">
          <Avatar size={50} src={member?.image as string} />
        </div>

        <div className="flex w-[70%] min-w-[70%] flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{member?.name}</h3>
            {member?.ComprehensiveProfile[0]?.location && (
              <p className="t-secondary text-xs">
                Currently in {member?.ComprehensiveProfile[0]?.location ?? ""}
              </p>
            )}
          </div>

          {member?.ComprehensiveProfile?.length > 0 && (
            <div className="flex">
              {member?.ComprehensiveProfile[0]?.bio && (
                <p className="text-sm italic">
                  {member?.ComprehensiveProfile[0]?.bio ?? ""}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <Link
        href={`/profile/${member?.id}`}
        className="flex h-[45px] w-[200px] items-center justify-center self-end rounded-xl border-[1px] border-blue-900 bg-transparent py-2 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-white/75 disabled:text-black/40"
        type="submit"
      >
        View Profile
      </Link>
    </motion.div>
  );
}
