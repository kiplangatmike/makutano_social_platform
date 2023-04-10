import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Image from "next/image";
import { setegid } from "process";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Education from "$components/Education";
import Experience from "$components/Experience";
import ProfilePost from "$components/ProfilePost";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);

  const [activeComponent, setActiveComponent] = useState("component1");

  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };
  return (
    <div>
      <Layout>
        {openModal && <ProfileModal onClose={() => setOpenModal(false)} />}
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
            <div className="my-3 flex gap-4">
              <div
                className={`rounded-xl px-4 py-1 ${activeComponent === "component1" ? "bg-red-800 text-white" : "bg-gray-200/20 text-white"}`}
                onClick={() => handleButtonClick("component1")}
              >
                <button>Posts</button>
              </div>
              <div
                className={`rounded-xl px-4 py-1 ${activeComponent === "component2" ? "bg-red-800 text-white" : "bg-gray-200/20 text-white"}`}
                onClick={() => handleButtonClick("component2")}
              >
                <button>Education</button>
              </div>
              <div
                className={`rounded-xl px-4 py-1 ${activeComponent === "component3" ? "bg-red-800 text-white" : "bg-gray-200/20 text-white"}`}
                onClick={() => handleButtonClick("component3")}
              >
                <button>Experience</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="feed-card mt-3 rounded-3xl p-4  ">
          <div className="mb-2 text-[20px] font-semibold">About</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            eu urna non commodo. Maecenas ultrices vitae erat ac suscipit. Donec
            ex mi, sagittis eget fringilla ornare, dictum vitae magna.
            Suspendisse risus massa, tempus in congue et, consectetur sed
            tortor. Nulla tempus diam est, ac gravida elit scelerisque at. In
            vel tincidunt odio, hendrerit fermentum orci. Donec tristique
            feugiat ullamcorper. Aenean id augue vestibulum, tempor felis vel,
            gravida nibh.
          </div>
        </div> */}
        <div className="feed-card mt-4 rounded-3xl p-4 ">
          {activeComponent === "component1" ? <ProfilePost /> : null}
          {activeComponent === "component2" ? <Education /> : null}
          {activeComponent === "component3" ? <Experience /> : null}
        </div>
      </Layout>
    </div>
  );
}

function ProfileModal({ onClose }: { onClose: () => void }) {
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
    <div className="absolute inset-0  z-10 w-[50%]">
      <div className="relative ">
        <div className=" feed-card fixed mx-auto w-full overflow-visible rounded-3xl bg-white text-black">
          <div
            onClick={onClose}
            className="absolute right-2 top-2  rounded-full bg-white p-2 text-black"
          >
            <AiOutlineClose />
          </div>
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
              <button
                className="rounded-xl bg-amber-800 px-4 py-1 "
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
