import { Post } from "$lib/types";
import OnePost from "$components/feed/Post";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function ProfilePost({ posts }: { posts: Post[] }) {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent} className="flex w-full flex-col gap-8">
      {posts?.length === 0 && (
        <p className="feed-card rounded-3xl p-4 font-semibold">
          No posts found
        </p>
      )}
      {posts?.map((p: Post) => (
        <OnePost key={p.id} post={p} />
      ))}
    </div>
  );
}
