import { useState } from "react";
import ProfileMod from "./ProfileMod";

export default function Education() {
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
          <h1>Add Education</h1>

          <div className="flex flex-col">
            <label className="">Level</label>
            <input placeholder="Input" />
            <label>School</label>
            <input placeholder="Input" />
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
