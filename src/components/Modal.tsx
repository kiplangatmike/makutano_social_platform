import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { MdClose } from "react-icons/md";

import AddPostForm from "$components/AddPostForm";
import {
  modalPostState,
  modalState,
  modalTypeState,
  modalStateAddChapters,
  postForChapters,
} from "$lib/atoms";
import AddChapter from "./AddChapter";

export default function Modal() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useAtom(modalState);
  const [isOpenChapters, setIsOpenChapters] = useAtom(modalStateAddChapters);
  const modalType = useAtomValue(modalTypeState);

  const setIsForChapters = useSetAtom(postForChapters);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <AnimatePresence mode="wait">
      {(isOpen || isOpenChapters) && (
        <Dialog
          static
          open={isOpen || isOpenChapters}
          onClose={() => {
            setIsOpen(false);
            setIsOpenChapters(false);
            setIsForChapters("");
          }}
          className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[10vh]"
        >
          <Dialog.Overlay
            as={motion.div}
            className="fixed inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {modalType === "dropIn" && (
            <motion.div
              // position: relative to bring the modal to front
              className="t-primary relative mx-auto flex max-h-[80vh] w-full max-w-xl flex-col justify-center overflow-y-hidden rounded-xl bg-white dark:bg-dblue"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              viewport={{ once: false }}
              exit="exit"
            >
              <header className="flex items-center justify-between border-b border-black/10 py-4 pl-6 pr-4 dark:border-gray-500">
                <Dialog.Title className="text-xl">
                  {isOpenChapters ? "Create a chapter" : "Create a post"}
                </Dialog.Title>
                <CloseButton />
              </header>

              {isOpenChapters ? <AddChapter /> : <AddPostForm />}
            </motion.div>
          )}
        </Dialog>
      )}
    </AnimatePresence>
  );
}

const CloseButton = () => {
  const setIsOpen = useSetAtom(modalState);
  const setIsOpenChapters = useSetAtom(modalStateAddChapters);
  const setPost = useSetAtom(modalPostState);
  const setModalType = useSetAtom(modalTypeState);

  const setIsForChapters = useSetAtom(postForChapters);

  return (
    <button
      onClick={() => {
        setPost(undefined);
        setIsOpen(false);
        setIsOpenChapters(false);
        setModalType("");
        setIsForChapters("");
      }}
      className="card-btn rounded-full p-2"
    >
      <MdClose className="t-secondary h-7 w-7" />
    </button>
  );
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
