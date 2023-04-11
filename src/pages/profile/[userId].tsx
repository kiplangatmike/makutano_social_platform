import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Image from "next/image";
import { setegid } from "process";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Education from "$components/Education";
import Experience from "$components/Experience";
import ProfilePost from "$components/ProfilePost";
import ProfileMod from "$components/ProfileMod";
import About from "$components/About";
import { motion } from "framer-motion";
import axios from "axios";
import { User } from "@prisma/client";
import { Post } from "$lib/types";

export default function Profile({
  data,
}: {
  data: User & {
    posts: Post[];
  };
}) {
  const [openModal, setOpenModal] = useState(false);

  const [activeComponent, setActiveComponent] = useState("component1");

  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };
  return (
    <Layout>
      {openModal && (
        <ProfileMod isOpen={openModal} onClose={() => setOpenModal(false)}>
          <ProfileModal />
        </ProfileMod>
      )}
      <div className="feed-card rounded-3xl">
        <div className="relative h-[80px] bg-gray-900">
          <div className="h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              width={1000}
              height={1000}
            ></Image>
          </div>
          <div className="absolute bottom-0 -mb-10 ml-5">
            <Avatar size={80} />
          </div>
          <div className="absolute bottom-0 right-0 -mb-10 mr-5 rounded-[8px] bg-gray-200/20 px-4 py-1">
            <button onClick={() => setOpenModal(true)}>Update profile</button>
          </div>
        </div>
        <div className=" ml-5 mt-12 h-2/3">
          <div className="relative">
            <p className="mb-1 text-2xl font-bold">{data?.name}</p>

            <p className="mb-1 mt-6 flex gap-1 font-semibold">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Kigali, Rwanda
            </p>
            <p className="mb-7 flex gap-1 font-semibold">
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
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              African Leadership University
            </p>
            <div className="bottom-20 left-0  flex w-full p-5 pb-4 font-bold text-white">
              <div className="mr-3 flex w-max">
                <span className="mr-1">{data?.posts?.length}</span>
                <p>Posts</p>
              </div>
              <div className="mx-3 flex w-max">
                <span className="mr-1">10</span>
                <>Following</>
              </div>
              <div className="mx-3 flex w-max">
                <span className="mr-1">7</span>
                <p>Followers</p>
              </div>
            </div>
          </div>
          <div className=" my-3 mr-5  flex flex-1 flex-grow flex-wrap justify-around rounded-xl border-[1px] border-blue-400/30">
            <motion.button
              onClick={() => handleButtonClick("component1")}
              whileTap={{ scale: 0.99 }}
              className={`t-secondary  min-w-[100px]  flex-1 rounded-l-xl bg-amber-800 py-1 text-center text-lg font-semibold transition-all duration-150 ease-in hover:bg-blue-400/30 ${
                activeComponent === "component1"
                  ? "bg-blue-400/30 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Post
            </motion.button>
            <motion.button
              onClick={() => handleButtonClick("component2")}
              whileTap={{ scale: 0.99 }}
              className={`t-secondary  min-w-[100px]   flex-1 bg-amber-800 py-1 text-center text-lg font-semibold transition-all duration-150 ease-in hover:bg-blue-400/30 ${
                activeComponent === "component2"
                  ? "bg-blue-400/30 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Education
            </motion.button>
            <motion.button
              onClick={() => handleButtonClick("component3")}
              whileTap={{ scale: 0.99 }}
              className={`t-secondary  min-w-[100px]  flex-1 bg-amber-800 py-1 text-center text-lg font-semibold transition-all duration-150 ease-in hover:bg-blue-400/30 ${
                activeComponent === "component3"
                  ? "bg-blue-400/30 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Experience
            </motion.button>
            <motion.button
              onClick={() => handleButtonClick("component4")}
              whileTap={{ scale: 0.99 }}
              className={`t-secondary  text- min-w-[100px] flex-1 rounded-r-xl bg-amber-800 py-1 text-center font-semibold transition-all duration-150 ease-in hover:bg-blue-400/30 ${
                activeComponent === "component4"
                  ? "bg-blue-400/30 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              About
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl p-4 px-0 ">
        {activeComponent === "component1" ? (
          <ProfilePost posts={data?.posts} />
        ) : null}
        {activeComponent === "component2" ? <Education /> : null}
        {activeComponent === "component3" ? <Experience /> : null}
        {activeComponent === "component4" ? <About /> : null}
      </div>
    </Layout>
  );
}

function ProfileModal() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`Name:`);
    setFullName("");
    setEmail("");
    setUniversity("");
    setHighSchool("");
    setDesc("");
  };

  return (
    <div>
      <form className=" p-2" onSubmit={handleSubmit}>
        <div className="mt-12 flex flex-col p-3">
          <label>Full name</label>
          <input
            className="mt-1 rounded-xl py-2 pl-3 text-black"
            type="text"
            placeholder="enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col p-3">
          <label>Email</label>
          <input
            className="mt-1 rounded-xl py-2 pl-3 text-black"
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col p-3">
          <label>University attended/attend</label>
          <input
            className="mt-1 rounded-xl py-2 pl-3 text-black"
            type="text"
            placeholder="enter full name "
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col p-3">
          <label>High School attended/attend</label>
          <input
            className="mt-1 rounded-xl py-2 pl-3 text-black"
            type="text"
            placeholder="high school name"
            value={highSchool}
            onChange={(e) => setHighSchool(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col p-3">
          <label>Short Description About You</label>
          <input
            className="mt-1 rounded-xl py-2 pl-3 text-black"
            type="text"
            placeholder="high school name"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></input>
        </div>
        <div className="text-center">
          <button className="rounded-xl bg-amber-800 px-4 py-1 " type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}users`
  );
  const paths = res.data.map((user: User) => ({
    params: {
      userId: user.id.toString(),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  console.log(params);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}users/${params.userId}`
  );
  console.log(res.data);
  return {
    props: {
      data: res.data,
    },
  };
};
