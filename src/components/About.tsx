import { useState } from "react";
import ProfileMod from "./ProfileMod";

export default function About({ bio }: { bio: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative pl-4">
      <p className="text-[15px] font-semibold">{bio}</p>
    </div>
  );
}
