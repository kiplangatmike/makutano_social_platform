import { useState } from "react";
import ProfileMod from "./ProfileMod";

export default function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative feed-card p-4 rounded-3xl">
      <button
        className="absolute right-5 top-4"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </button>
      <ProfileMod isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form>
          <h1 className="text-2xl">Add Education</h1>

          <div className="mt-5">
            <div className="flex flex-col">
            <label className="">Level</label>
            <input
              placeholder="Input"
              className="mt-1 rounded-xl py-2 border-none pl-3 text-black"
              type="text"
            /></div>
            <div className="mt-2 flex flex-col">
            <label>School</label>
            <input
              placeholder="Input"
              className="mt-1 rounded-xl border-none py-2 pl-3 text-black"
              type="text"
            /></div>
            <div className="text-center mt-4">
              <button
                className="rounded-xl bg-amber-800 px-4 py-1 "
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </ProfileMod>
      <div className="mb-2 text-[20px] font-semibold">Education</div>
      <div className="text-[15px] font-semibold">Primary School</div>
      <div className="text-[12px]">Kinoo Primary School</div>
      <div className="text-[15px] font-semibold">High School </div>
      <div className="text-[12px]">Jeremy High School</div>
      <div className="text-[15px] font-semibold">University </div>
      <div className="text-[12px]">Earth University </div>
    </div>
  );
}
