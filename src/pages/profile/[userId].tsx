import Avatar from "$components/common/Avatar";
import Layout from "$components/common/Layout";
import Image from "next/image";
import React, { useState } from "react";
import Education from "$components/profile/Education";
import Experience from "$components/profile/Experience";
import ProfilePost from "$components/profile/userPosts";
import ProfileMod from "$components/profile/updateProfileModal";
import About from "$components/profile/About";
import { motion } from "framer-motion";
import axios from "axios";
import {
  ComprehensiveProfile,
  Education as IEducation,
  User,
  Experience as IExperience,
} from "@prisma/client";
import { Post } from "$lib/types";
import { useSession } from "next-auth/react";
import { useUpdateUserProfileMutation } from "$services/baseApiSlice";
import toaster from "$lib/utils/toaster";
import HeaderSeo from "$components/common/head";

export default function Profile({
  data,
}: {
  data: User & {
    posts: Post[];
    ComprehensiveProfile: ComprehensiveProfile[];
    education: IEducation[];
    experience: IExperience[];
  };
}) {
  const [openModal, setOpenModal] = useState(false);

  const { data: session } = useSession();

  const [activeComponent, setActiveComponent] = useState("component1");

  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <HeaderSeo
        title={`${data?.name} profile - Makutano`}
        description={
          data?.ComprehensiveProfile?.length > 0
            ? data?.ComprehensiveProfile[0]?.bio
            : undefined
        }
        image={data?.image as string}
      />
      <Layout>
        {openModal && (
          <ProfileMod isOpen={openModal} onClose={() => setOpenModal(false)}>
            <ProfileModal onClose={() => setOpenModal(false)} />
          </ProfileMod>
        )}
        <div className="feed-card rounded-3xl dark:bg-gray-900">
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
              <Avatar src={data?.image as string} size={80} />
            </div>
            {session?.user?.uid === data?.id && (
              <div className="absolute bottom-0 right-0 -mb-10 mr-5 rounded-[8px] bg-gray-200/20 px-4 py-1">
                <button onClick={() => setOpenModal(true)}>
                  Update profile
                </button>
              </div>
            )}
          </div>
          <div className=" ml-5 mt-12 h-2/3">
            <div className="relative">
              <p className="mb-1 text-2xl font-bold">{data?.name}</p>

              {data?.ComprehensiveProfile[0]?.location && (
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
                  {data?.ComprehensiveProfile[0]?.location ?? ""}
                </p>
              )}
              {data?.education?.length > 0 && (
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
                  {data?.education?.length > 0
                    ? data?.education[0]?.school
                    : ""}
                </p>
              )}
              <p className="mb-4 mr-5 rounded-lg py-2 italic">
                {data?.ComprehensiveProfile[0]?.bio}
              </p>
              <div className="bottom-20 left-0 flex w-full p-5 pb-4 pl-0 font-bold text-white">
                <div className="mr-3 flex w-max">
                  <span className="mr-1">{data?.posts?.length}</span>
                  <p>Posts</p>
                </div>
                <div className="mx-3 hidden w-max">
                  <span className="mr-1">10</span>
                  <>Following</>
                </div>
                <div className="mx-3 hidden w-max">
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
                    ? "bg-blue-500/30 text-white"
                    : "bg-transparent text-white"
                }`}
              >
                Post
              </motion.button>
              <motion.button
                onClick={() => handleButtonClick("component2")}
                whileTap={{ scale: 0.99 }}
                className={`t-secondary  min-w-[100px] flex-1 bg-amber-800 py-1 text-center text-lg font-semibold transition-all duration-150 ease-in hover:bg-blue-400/30 ${
                  activeComponent === "component2"
                    ? "bg-blue-500/30 text-white"
                    : "bg-transparent text-white"
                }`}
              >
                Education
              </motion.button>
              <motion.button
                onClick={() => handleButtonClick("component3")}
                whileTap={{ scale: 0.99 }}
                className={`t-secondary  min-w-[100px]  flex-1 bg-amber-800 py-1 rounded-r-xl text-center text-lg font-semibold transition-all duration-150 ease-in hover:bg-blue-400/30 ${
                  activeComponent === "component3"
                    ? "bg-blue-500/30 text-white"
                    : "bg-transparent text-white"
                }`}
              >
                Experience
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl p-4 px-0 ">
          {activeComponent === "component1" ? (
            <ProfilePost posts={data?.posts} />
          ) : null}
          {activeComponent === "component2" ? (
            <Education data={data?.education} />
          ) : null}
          {activeComponent === "component3" ? (
            <Experience data={data?.experience} />
          ) : null}
        </div>
      </Layout>
    </>
  );
}

function ProfileModal({ onClose }: { onClose: () => void }) {
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  // const [fieldOfStudy, setFieldOfStudy] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // experience
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  // const [start, setStart] = useState("");
  // const [end, setEnd] = useState("");

  const [currentLocation, setCurrentLocation] = useState("");

  const [bio, setBio] = useState("");

  const { data: session } = useSession();

  const [updateProfileData] = useUpdateUserProfileMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      currentLocation,
      bio,
      id: session?.user?.uid,
      education: [
        {
          schoolName,
          degree,
        },
      ],
      experience: [
        {
          role,
          company,
          location,
        },
      ],
    };

    await updateProfileData(body)
      .unwrap()
      .then((payload) => {
        toaster({
          status: "success",
          message: "Profile updated successfully",
        });
        onClose();
      })
      .catch((error) => {
        toaster({
          status: "error",
          message: error?.message ?? "Error while liking. Try again later",
        });
      });
  };

  return (
    <div>
      <form className="p-2" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Personal details</h2>
        <div className="flex">
          <div className="flex w-1/2 flex-col p-3">
            <label className="text-sm">Your bio</label>
            <textarea
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              placeholder={`Tell us about yourself`}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="flex w-1/2 flex-col p-3">
            <label className="text-sm">Current City and Country</label>
            <input
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              type="text"
              placeholder="e.g Kigali, Rwanda"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            ></input>
          </div>
        </div>

        <hr className="my-4 mr-2 h-[1px] flex-grow border-t border-black/10 bg-black/10 dark:border-gray-500 dark:bg-gray-500" />
        <h2 className="text-lg font-semibold">Education</h2>
        <div className="flex">
          <div className="flex flex-col p-3">
            <label className="text-sm">University name</label>
            <input
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              type="text"
              placeholder="e.g Harvard University"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col p-3">
            <label className="text-sm">Degree</label>
            <input
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              type="text"
              placeholder="e.g Bsc Computer Science"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            ></input>
          </div>
        </div>

        <hr className="my-4 mr-2 h-[1px] flex-grow border-t border-black/10 bg-black/10 dark:border-gray-500 dark:bg-gray-500" />
        <h2 className="text-lg font-semibold">Work or business experience</h2>
        <div className="flex">
          <div className="flex flex-col p-3">
            <label className="text-sm">Company</label>
            <input
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              type="text"
              placeholder="e.g Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col p-3">
            <label className="text-sm">Position</label>
            <input
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              type="text"
              placeholder="e.g Software Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col p-3">
            <label className="text-sm">Location</label>
            <input
              className="mt-1 rounded-xl py-2 pl-3 text-black"
              type="text"
              placeholder="e.g Kigali, Rwanda"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="mt-6 w-full text-center">
          <button
            disabled={
              !bio ||
              !currentLocation ||
              !schoolName ||
              !degree ||
              !company ||
              !role ||
              !location
            }
            className="w-1/2 rounded-xl bg-amber-800 px-10 py-2 text-xl "
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export const getStaticPaths = async () => {
  try {
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
    userId: string;
  };
}) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_V1}users/${params.userId}`
    );
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    // not found
    return {
      notFound: true,
    };
  }
};
