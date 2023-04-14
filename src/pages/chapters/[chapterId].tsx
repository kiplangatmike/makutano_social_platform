import ChapterView from "$components/chapters/chapterView";
import { Chapters } from "@prisma/client";
import axios from "axios";
import React from "react";
import { Post } from "$lib/types";
import { User } from "@prisma/client";

export default function OneChapter({
  data,
}: {
  data: Chapters & {
    posts: Post[];
    users: User[];
  };
}) {
  return <ChapterView data={data} />;
}

export const getStaticPaths = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}chapters`
    );
    const paths = res.data.map((chapter: Chapters) => ({
      params: {
        chapterId: chapter.id.toString(),
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

export const getStaticProps = async ({
  params,
}: {
  params: {
    chapterId: string;
  };
}) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}chapters/${params.chapterId}`
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
