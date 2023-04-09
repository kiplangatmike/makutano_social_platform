import Avatar from "$components/Avatar";
import Layout from "$components/Layout";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      <div className="feed-card mx-[350px] h-[50vh] rounded-3xl">
        {openModal && <ProfileModal onClose={() => setOpenModal(false)} />}
        <div className="relative h-1/3 bg-gray-900">
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
          <div className="absolute bottom-0 right-0 -mb-10 mr-5 rounded-xl bg-gray-200/20 px-4 py-1">
            <button onClick={() => setOpenModal(true)}>update profile</button>
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

function ProfileModal({ onClose }: { onClose: Function }) {
  type FormData = {
    fullName: string;

    email: string;
    university: string;
    highSchool: string;
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    university: "",
    highSchool: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className=" absolute z-10">
      <div className="relative w-[200%]">
        <div
          onClick={onClose}
          className="absolute -right-7 -top-7  rounded-full bg-white p-2 text-black"
        >
          <AiOutlineClose />
        </div>
        <div className=" feed-card mx-auto w-full overflow-visible rounded-3xl bg-white text-black">
          <form className="p-2 " onSubmit={handleSubmit}>
            <div className="flex flex-col p-3">
              <label>Full name</label>
              <input
                className="mt-1 rounded-xl py-2 pl-3"
                title="text"
                placeholder="enter full name"
                value={formData.fullName}
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-col p-3">
              <label>Email</label>
              <input
                className="mt-1 rounded-xl py-2 pl-3"
                title="text"
                placeholder="enter your email"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col p-3">
              <label>University attended/attend</label>
              <input
                className="mt-1 rounded-xl py-2 pl-3"
                title="text"
                placeholder="enter full name "
                value={formData.university}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col p-3">
              <label>High School attended/attend</label>
              <input
                className="mt-1 rounded-xl py-2 pl-3"
                title="text"
                placeholder="high school name"
                value={formData.highSchool}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col p-3">
              <label>Short Description About You</label>
              <input
                className="mt-1 rounded-xl py-2 pl-3"
                title="text"
                placeholder="high school name"
                value={formData.highSchool}
                onChange={handleChange}
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
