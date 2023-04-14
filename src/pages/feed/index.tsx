import type { GetServerSideProps } from "next";
import type { Article } from "$lib/types";
import axios from "axios";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import { prisma } from "$lib/config/prisma";
import Feed from "$components/Feed";
import { articlesState } from "$lib/atoms";
import Layout from "$components/Layout";

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
      {
        title: "ELPs attend Harvard Africa Business Conference 2023 held at harvard",
        description: `On the 04th June 2023, Equity Leaders Program Global scholars and Alumni from across the world held a short meeting that was was graced by a Virtual engagement by the Equity GCEO, Dr. James Mwangi. Present in the meeting was Dr. Beth Waweru and Dr. Joanne Korir who shared nuggets with the team. This meeting was helpful in discussing the desired impact for all scholars on the program, mentorship and inspiration.`,
        postedBy: "John Doe",
        postedAt: "2023-04-01T00:00:00.000Z",
      },
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Feed />
    </Layout>
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
