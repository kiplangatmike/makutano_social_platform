import type { GetServerSideProps } from "next";
import type { Article } from "$lib/types";
import Head from "next/head";
import axios from "axios";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import { prisma } from "$lib/config/prisma";
import Feed from "$components/Feed";
import { articlesState } from "$lib/atoms";
import Layout from "$components/Layout";

export default function FeedPage({ articles }: Props) {
  const setArticles = useSetAtom(articlesState);

  useEffect(() => {
    setArticles(articles);
  }, [articles, setArticles]);

  return (
    <Layout>
      <Feed />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Check if the user is authenticated on the server...
  const session = await unstable_getServerSession(req, res, authOptions);

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
