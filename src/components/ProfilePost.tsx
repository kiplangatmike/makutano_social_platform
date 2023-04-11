import { Post } from "$lib/types";
import OnePost from "./Post";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ProfilePost({ posts }: { posts: Post[] }) {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent} className="w-full flex flex-col gap-8">
      {posts?.length === 0 && <p>No posts found</p>}
      {posts?.map((p: Post) => (
        <OnePost key={p.id} post={p} />
      ))}
    </div>
  );
}
