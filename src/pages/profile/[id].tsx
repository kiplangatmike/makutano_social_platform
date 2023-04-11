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

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);

  const [activeComponent, setActiveComponent] = useState("component1");

  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };
  return (
    <div>
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
              <button onClick={() => setOpenModal(true)}>update profile</button>
            </div>
          </div>
          <div className=" ml-5 mt-12 h-2/3">
            <div className="relative">
              <p className="mb-1 text-2xl font-bold">Mike Kiplangat</p>

              <p className="mb-2 font-semibold">@mickey</p>
              <p className="mb-1 font-semibold">Kigali, Rwanda</p>
              <p className="mb-7 font-semibold">
                African Leadership University
              </p>
              <div className="bottom-20 left-0 flex pb-4 font-bold text-white">
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
            <div className="my-3 mr-5 flex flex-1 flex-grow flex-wrap justify-around gap-3">
              <motion.button
                onClick={() => handleButtonClick("component1")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`t-secondary  min-w-[100px]  flex-1 rounded-xl bg-amber-800 py-1 text-center text-lg font-semibold hover:bg-amber-800 ${
                  activeComponent === "component1"
                    ? "bg-amber-800 text-white"
                    : "bg-gray-200/20 text-white"
                }`}
              >
                Post
              </motion.button>
              <motion.button
                onClick={() => handleButtonClick("component2")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`t-secondary  min-w-[100px]   flex-1 rounded-xl bg-amber-800 py-1 text-center text-lg font-semibold hover:bg-amber-800 ${
                  activeComponent === "component2"
                    ? "bg-amber-800 text-white"
                    : "bg-gray-200/20 text-white"
                }`}
              >
                Education
              </motion.button>
              <motion.button
                onClick={() => handleButtonClick("component3")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`t-secondary  min-w-[100px]  flex-1 rounded-xl bg-amber-800 py-1 text-center text-lg font-semibold hover:bg-amber-800 ${
                  activeComponent === "component3"
                    ? "bg-amber-800 text-white"
                    : "bg-gray-200/20 text-white"
                }`}
              >
                Experience
              </motion.button>
              <motion.button
                onClick={() => handleButtonClick("component4")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`t-secondary  text- min-w-[100px] flex-1 rounded-xl bg-amber-800 py-1 text-center font-semibold hover:bg-amber-800 ${
                  activeComponent === "component4"
                    ? "bg-amber-800 text-white"
                    : "bg-gray-200/20 text-white"
                }`}
              >
                About
              </motion.button>
            </div>
          </div>
        </div>

        <div className="feed-card mt-4 rounded-3xl p-4 ">
          {activeComponent === "component1" ? <ProfilePost /> : null}
          {activeComponent === "component2" ? <Education /> : null}
          {activeComponent === "component3" ? <Experience /> : null}
          {activeComponent === "component4" ? <About /> : null}
        </div>
      </Layout>
    </div>
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
