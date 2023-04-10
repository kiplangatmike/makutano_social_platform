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
          <h1>Add Experience</h1>

          <div className="flex flex-col">
            <label className="">Role</label>
            <input placeholder="Input" />
            <label>Place of work</label>
            <input placeholder="Input" />
          </div>
        </form>
      </ProfileMod>
      <div className="mb-2 text-[20px] font-semibold">
        Professional Experience{" "}
      </div>
      <div className="text-[15px] font-semibold">
        Senior Software Developer{" "}
      </div>
      <div className="text-[12px]">Google</div>
      <div className="text-[15px] font-semibold">Software Developer </div>
      <div className="text-[12px]">ABC Company </div>
    </div>
  );
}
