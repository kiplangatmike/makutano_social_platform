import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Image from "next/image";

export default function Profile() {
  return (
    <Layout>
      <div className="feed-card h-[50vh] rounded-3xl">
        <div className="relative h-1/3 bg-gray-900">
          <div className="h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              width={1000}
              height={1000}
            ></Image>
          </div>
          <div className="absolute bottom-0 mx-5 -mb-10">
            <Avatar size={80} />
          </div>
        </div>
        <div className=" ml-5 mt-12 h-2/3">
          <div className="relative">
            <p className="mb-1 text-2xl font-bold">Mike Kiplangat</p>

            <p className="mb-2 font-semibold">@mickey</p>
            <p className="mb-1 font-semibold">Kigali, Rwanda</p>
            <p className="mb-7 font-semibold">African Leadership University</p>
            <div className="absolute -bottom-20 left-0 flex font-bold">
              <div className="mr-3">
                <span className="mr-1">3</span>
                <button>Posts</button>
              </div>
              <div className="mx-3">
                <span className="mr-1">10</span>
                <button>Following</button>
              </div>
              <div className="mx-3">
                <span className="mr-1">7</span>
                <button>Followers</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
