import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Link from "next/link";

export default function Notification() {
  const notifications = [
    ["Mike Kiplangat", " liked your post"],
    ["Liplan Lekipising", " started following you"],
    ["Mercy Nyamusi ", "started following you"],
  ];
  return (
    <Layout>
      <div className="feed-card flex flex-col  rounded-3xl">
        <div className="my-2 text-center text-2xl font-bold">Notifications</div>
        <Link href="/profile" className="m-2 ">
          {notifications?.map((index, noti) => (
            <div
              key={noti}
              className="card-btn flex items-center rounded-3xl py-4 pl-3"
            >
              <Avatar size={30} />
              <span className="ml-4 mr-2 font-semibold hover:underline">
                {index[0]}
              </span>
              {index[1]}
            </div>
          ))}
        </Link>
      </div>
    </Layout>
  );
}
