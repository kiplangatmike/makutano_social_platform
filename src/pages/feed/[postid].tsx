import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Link from "next/link";

export default function OnePost(id: number) {
  return (
    <Layout>
      <div className="feed-card rounded-3xl">
        <Link href="/profile" className="flex ">
          <span className=" cursor-pointer">
            <Avatar size={40} />
          </span>
          <div className="ml-2 flex-grow leading-5">
            <p className="t-link dark:t-white hover:t-blue dark:hover:t-blue-light font-semibold text-black/90">
              Liplan Lekipising
            </p>
            {/* {post?.createdAt && (
              <p className="t-secondary text-xs">
                {formatDistanceToNow(parseISO(post?.createdAt as string), {
                  addSuffix: true,
                })}{" "}
              </p>
            )} */}
            08/04/2023
          </div>
        </Link>
      </div>
    </Layout>
  );
}
