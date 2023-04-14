import Layout from "$components/common/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { motion } from "framer-motion";

import { modalStateAddChapters, modalTypeState } from "$lib/atoms";
import { useGetAllChaptersQuery } from "$services/baseApiSlice";
import { Chapters as PrismaChapters } from "@prisma/client";
import { useRouter } from "next/router";
import HeaderSeo from "$components/common/head";

export default function Chapters() {
  const setModalOpen = useSetAtom(modalStateAddChapters);
  const setModalType = useSetAtom(modalTypeState);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalType("dropIn");
  }, [setModalOpen, setModalType]);

  const router = useRouter();

  const { refetchChapters, refetchPosts } = router.query;

  const { data, isFetching, refetch } = useGetAllChaptersQuery(undefined);

  useEffect(() => {
    if (refetchChapters || refetchPosts) {
      refetch();
      router.replace("/chapters", undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchChapters, refetchPosts]);

  return (
    <>
      <HeaderSeo
        title="ELP Chapters - Makutano"
        description="Discover and engage with ELP Chapters, exclusive groups for universities, continents, and disciplines. Expand your network and stay connected with like-minded professionals in your field. "
      />
      <Layout>
        <div className="relative mx-auto mt-0 w-full rounded-md bg-[#111827] px-4 pb-6 pr-4 xl:w-[40vw] 2xl:w-[50vw]">
          <button
            onClick={openModal}
            className="absolute right-4 top-2 flex items-center justify-center gap-2 rounded-md bg-white px-8 py-2 text-base font-semibold text-black hover:bg-blue-400/25 hover:text-white"
          >
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
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Create Chapter
          </button>
          {isFetching && <div>Loading...</div>}
          <div className="mt-6 flex w-full flex-wrap justify-start gap-6 pt-16">
            {data &&
              data?.length > 0 &&
              data.map((chapter: PrismaChapters, index: number) => (
                <OneChapterCard
                  key={chapter.name}
                  image={chapter.image}
                  name={chapter.name}
                  link={`/chapters/${chapter.id}`}
                  members={chapter?.userIds?.length || 0}
                  postsCount={chapter?.postIds?.length || 0}
                  index={index}
                />
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

function OneChapterCard({
  image,
  name,
  link,
  members,
  postsCount,
  index,
}: {
  image: string;
  name: string;
  link: string;
  members: number;
  postsCount: number;
  index: number;
}) {
  return (
    <Link href={link} legacyBehavior>
      <motion.a
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1, ease: "easeIn" }}
        viewport={{ once: true }}
        title={`View Chapter: ${name}`}
        className="group relative max-h-[350px] min-h-[260px] w-[300px] max-w-[300px] rounded-xl dark:bg-gray-800"
      >
        <div className="p-3 ">
          <h2 className="ml-3 w-max text-center text-lg font-bold">{name}</h2>
        </div>
        <div className="relative mx-auto h-3/5 w-[90%] rounded-xl">
          <Image fill src={image} className="rounded-xl" alt={name} />
        </div>

        <div className="absolute bottom-2 flex w-full justify-between  gap-3 px-4 text-xs text-white">
          <p className="flex w-max items-center gap-1">
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
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            {members} members
          </p>
          <p className="flex w-max items-center gap-1">
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            {postsCount} posts
          </p>
        </div>
      </motion.a>
    </Link>
  );
}
