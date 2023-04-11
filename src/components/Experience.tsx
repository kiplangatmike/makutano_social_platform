import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ProfileMod from "./ProfileMod";

export default function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="absolute right-0 top-0"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </button>
      <ProfileMod isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form>
          <h1 className="text-2xl">Add Experience</h1>

          <div className="mt-5 flex flex-col">
            <div className="flex flex-col">
              <label className="">Role</label>
              <input
                placeholder="Input"
                className="mt-1 rounded-xl border-none py-2 pl-3 text-black"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label>Place of work</label>
              <input
                placeholder="Input"
                className="mt-1 rounded-xl border-none py-2 pl-3 text-black"
                type="text"
              />
            </div>
            <div className="text-center mt-4">
              <button
                className="rounded-xl  bg-amber-800 px-4 py-1 hover:bg-amber-900"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </ProfileMod>
      <div className="mb-2 text-[20px] font-semibold">
        Professional Experience{" "}
      </div>
      <div className="text-[15px] font-semibold">
        Senior Software Developer{" "}
      </div>
      <div className="text-[13px]"><span>2020-2022.</span>Google</div>
      <div className="text-[15px] font-semibold">Software Developer </div>
      <div className="text-[12px]"><span>2017-2020.</span>ABC Company </div>
    </div>
  );
}
