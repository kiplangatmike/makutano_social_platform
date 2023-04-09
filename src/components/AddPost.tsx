import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { motion } from "framer-motion";

import Avatar from "$components/Avatar";
import { modalState, modalTypeState } from "$lib/atoms";

export default function AddPost() {
  const setModalOpen = useSetAtom(modalState);
  const setModalType = useSetAtom(modalTypeState);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalType("dropIn");
  }, [setModalOpen, setModalType]);

  return (
    <div className="t-secondary feed-card fixed top-11 z-10 w-full rounded-3xl">
      <div className="flex items-center p-4 pt-3 ">
        <a href="#" className="mr-2 flex rounded-3xl">
          <Avatar size={48} />
        </a>
        <motion.button
          onClick={openModal}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="card-btn my-0 flex h-12 flex-grow items-center rounded-3xl border border-black/30 px-4 py-2.5 dark:border-gray-500"
        >
          <span className="text-sm font-semibold">Update</span>
        </motion.button>
      </div>
    </div>
  );
}
