import { useCallback } from 'react'
import { useSetAtom } from 'jotai'
import { motion } from 'framer-motion'
import {
  MdArticle,
  MdEvent,
  MdOutlinePhotoSizeSelectActual,
  MdSmartDisplay,
} from 'react-icons/md'

import Avatar from '$components/Avatar'
import { modalState, modalTypeState } from '$lib/atoms'

export default function AddPost() {
  const setModalOpen = useSetAtom(modalState)
  const setModalType = useSetAtom(modalTypeState)

  const openModal = useCallback(() => {
    setModalOpen(true)
    setModalType('dropIn')
  }, [setModalOpen, setModalType])

  return (
    <div className="t-secondary rounded-[10px] bg-black">
      <div className="flex items-center p-4 pt-3">
        <a href="#" className="mr-2 flex rounded-[10px]">
          <Avatar size={48} />
        </a>
        <motion.button
          onClick={openModal}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="card-btn my-1 flex h-12 flex-grow items-center rounded-[10px] border border-black/30 px-4 py-2.5 dark:border-gray-500"
        >
          <span className="text-sm font-semibold">Update</span>
        </motion.button>
      </div>

      <div className="flex flex-wrap justify-around pb-1">
        <button className="addpost-btn card-btn">
          <MdOutlinePhotoSizeSelectActual className="text-blue-400" size={24} />
          <h4 className="whitespace-nowrap">Photo</h4>
        </button>
        <button className="addpost-btn card-btn">
          <MdSmartDisplay className="text-green-500" size={24} />
          <h4 className="whitespace-nowrap">Video</h4>
        </button>
        <button className="addpost-btn card-btn">
          <MdEvent className="text-yellow-500" size={24} />
          <h4 className="whitespace-nowrap">Event</h4>
        </button>
        <button className="addpost-btn card-btn">
          <MdArticle className="text-red-400" size={24} />
          <h4 className="whitespace-nowrap">Write article</h4>
        </button>
      </div>
    </div>
  )
}
