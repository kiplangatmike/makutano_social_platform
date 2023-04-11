import { useState } from "react";
import ProfileMod from "./ProfileMod";

export default function About() {
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
          <h1 className="text-2xl font-semibold mb-2">About</h1>

          <div className="flex flex-col">
            <label className="">Update</label>
            <input placeholder="Input " className="text-start pt-2 pl-2 mt-2 pb-40 rounded-xl" />
          </div>
        </form>
      </ProfileMod>
      <div className="feed-card mt-3 rounded-3xl p-  ">
        <div className="mb-2 text-[20px] font-semibold">About</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue eu
          urna non commodo. Maecenas ultrices vitae erat ac suscipit. Donec ex
          mi, sagittis eget fringilla ornare, dictum vitae magna. Suspendisse
          risus massa, tempus in congue et, consectetur sed tortor. Nulla tempus
          diam est, ac gravida elit scelerisque at. In vel tincidunt odio,
          hendrerit fermentum orci. Donec tristique feugiat ullamcorper. Aenean
          id augue vestibulum, tempor felis vel, gravida nibh.
        </div>
      </div>
    </div>
  );
}
