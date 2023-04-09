import { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { MdClose } from "react-icons/md";

import AddPostForm from "$components/AddPostForm";
import Post from "$components/Post";
import { modalPostState, modalState, modalTypeState } from "$lib/atoms";

export default function Modal() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useAtom(modalState);
  const modalType = useAtomValue(modalTypeState);
  const post = useAtomValue(modalPostState);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-20 overflow-y-auto p-4 pt-[10vh]"
        >
          <Dialog.Overlay
            as={motion.div}
            // onClick={() => setIsOpen(false)}
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
              exit="exit"
            >
              <header className="flex items-center justify-between border-b border-black/10 py-4 pl-6 pr-4 dark:border-gray-500">
                <Dialog.Title className="text-xl">Create a post</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Create a new LinkedIn post
                </Dialog.Description>
                <CloseButton />
              </header>

              <AddPostForm />
            </motion.div>
          )}
        </Dialog>
      )}
    </AnimatePresence>
  );
}

const CloseButton = () => {
  const setIsOpen = useSetAtom(modalState);
  const setPost = useSetAtom(modalPostState);

  return (
    <button
      onClick={() => {
        setPost(undefined);
        setIsOpen(false);
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

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};
