import type { GetServerSideProps } from "next";
import type { Article } from "$lib/types";
import axios from "axios";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import { prisma } from "$lib/config/prisma";
import Feed from "$components/feed/Feed";
import { articlesState } from "$lib/atoms";
import Layout from "$components/common/Layout";
import HeaderSeo from "$components/common/head";

export default function FeedPage({ articles }: Props) {
  const setArticles = useSetAtom(articlesState);

  useEffect(() => {
    setArticles([
      {
        title: "Time management and being productive",
        description: `Join us for a discussion on time management and being productive.`,
        postedBy: "John Doe",
        postedAt: "2021-08-01T00:00:00.000Z",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderSeo title={`Feed - Makutano`} />
      <Layout>
        <Feed />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Check if the user is authenticated on the server...
  const session = await getServerSession(req, res, authOptions);

  // Get posts on SSR
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts"], async () => {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
            id: true,
            image: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return posts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();

  // Get Google News API
  const { data: news } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );

  return {
    props: {
      session,
      dehydratedState,
      articles: news.articles,
    },
  };
};

type Props = {
  articles: Article[];
};
