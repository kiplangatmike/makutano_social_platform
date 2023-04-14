import { useState } from "react";
import ProfileMod from "./updateProfileModal";

export default function About({ bio }: { bio: string }) {
  return (
    <div className="relative pl-4">
      <p className="text-[15px] font-semibold">{bio}</p>
    </div>
  );
}
