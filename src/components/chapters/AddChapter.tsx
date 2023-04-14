import type { AddPostFormValues, Post } from "$lib/types";
import {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type SubmitHandler, useForm, ChangeHandler } from "react-hook-form";
import { useSetAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import {
  modalPostState,
  modalStateAddChapters,
  editingChapter,
} from "$lib/atoms";
import { MdClose, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { TiStarburst } from "react-icons/ti";
import { modalState } from "$lib/atoms";

import {
  useCreateChapterMutation,
  useEditChapterMutation,
} from "$services/baseApiSlice";
import { uploadOne } from "$lib/utils/uploader";
import toaster from "$lib/utils/toaster";

import { useDropzone } from "react-dropzone";
import { AiFillDelete } from "react-icons/ai";
import { Chapters } from "@prisma/client";
import { useRouter } from "next/router";

export default function AddChapter() {
  const [images, setImages] = useState<File[]>([]);

  // @ts-ignore
  const chapter: Chapters = useAtomValue(editingChapter);

  const queryClient = useQueryClient();
  const setModalOpen = useSetAtom(modalStateAddChapters);
  const { data: session } = useSession();
  const {
    setFocus,
    handleSubmit,
    register,
    watch,
    formState,
    reset,
    resetField,
  } = useForm<AddPostFormValues>();
  const { isSubmitting } = formState;

  const [createChapter, { isLoading }] = useCreateChapterMutation();
  const [editChapter] = useEditChapterMutation();

  const uploadMedia = async (files: File[]) => {
    //  upload files, use async method - uploadOne
    const responses = await Promise.all(
      files.map((file: File) => uploadOne(file))
    ).catch((error) => {
      console.log(error);
    });

    return responses;
  };

  const router = useRouter();

  const onCreateChapter = async (data: {
    name: string;
    description: string;
    images: File[];
  }) => {
    if (!session?.user?.uid) return;
    try {
      const body = {
        name: data.name.trim(),
        description: data.description.trim(),
        createdBy: session.user.uid,
      };

      await createChapter(body)
        .unwrap()
        .then((payload) => {
          // upload images
          if (images.length > 0) {
            // @ts-ignore
            uploadMedia(images).then((res: string[]) => {
              axios.patch(`/api/chapters`, {
                image: res[0],
                id: payload.id,
              });
            });
          }
          // play ding.mp3
          const ding = new Audio("/ding.mp3");
          // volume 50%
          ding.volume = 0.5;
          ding.play();

          router.push(`/chapters?refetchChapters=true`);

          toaster({
            status: "success",
            message: "Chapter created successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          toaster({
            status: "error",
            // @ts-ignore
            message: error ?? "Error while creating chapter. Try again later.",
          });
        });

      reset();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toaster({
        status: "error",
        // @ts-ignore
        message: error ?? "Error while creating chapter. Try again later.",
      });
    }
  };

  const onEditChapter = async (data: {
    name: string;
    description: string;
    images: File[];
  }) => {
    if (!session?.user?.uid) return;
    try {
      const body = {
        name: data.name.trim(),
        description: data.description.trim(),
        id: chapter?.id,
      };

      await editChapter(body)
        .unwrap()
        .then((payload) => {
          // upload images
          if (images.length > 0) {
            // @ts-ignore
            uploadMedia(images).then((res: string[]) => {
              axios.patch(`/api/chapters`, {
                image: res[0],
                id: payload.id,
              });
            });
          }
          toaster({
            status: "success",
            message: "Chapter edited successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          toaster({
            status: "error",
            // @ts-ignore
            message: error ?? "Error while editing chapter. Try again later.",
          });
        });

      reset();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toaster({
        status: "error",
        // @ts-ignore
        message: error ?? "Error while editing chapter. Try again later.",
      });
    }
  };

  useEffect(() => {
    setFocus("input");
  }, [setFocus]);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      // video
      "video/mp4": [],
    },
    maxSize: 1000000,
    onDrop: async (acceptedFiles) => {
      const renamedAcceptedFiles = acceptedFiles.slice(0, 1).map(
        (file) =>
          new File([file], `${new Date()}_${file.name}`, {
            type: file.type,
          })
      );
      if (renamedAcceptedFiles[0]) {
        const newFile = renamedAcceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        setImages([...images, ...newFile]);
      }
    },
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (chapter) {
      setName(chapter.name);
      setDescription(chapter.description);
    }
  }, [chapter]);

  return (
    <div className="overflow-auto px-8">
      <form
        className="t-primary flex h-full flex-col justify-between gap-4 py-8"
        onSubmit={(e) => {
          e.preventDefault();
          chapter
            ? onEditChapter({
                name,
                description,
                images,
              })
            : onCreateChapter({
                name,
                description,
                images,
              });
        }}
      >
        {/* name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-1 text-base font-medium text-white"
          >
            Name
          </label>
          <input
            id="name"
            className="bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-base font-medium text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            className="resize-none rounded-md bg-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* images */}
        {images.length === 0 && (
          <div className="flex items-center">
            <label
              {...getRootProps()}
              className="t-secondary card-btn block rounded-xl p-2 pl-0"
            >
              <span className="mb-2 text-base font-medium text-white">
                Choose image
              </span>
              <input {...getInputProps()} />
              <MdOutlinePhotoSizeSelectActual size={30} />
            </label>
          </div>
        )}

        {images.length > 0 && (
          <div className="relative mx-6 my-3 ml-0">
            <div
              style={{
                backgroundImage: `url(${
                  // @ts-ignore
                  images.length > 0 ? images[0]?.preview : ""
                })`,
              }}
              className={`relative flex h-[150px] w-[300px] items-center justify-center rounded-[10px] bg-cover bg-center transition-all duration-300 ease-in`}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  resetField("image");
                  setImages([]);
                }}
                className="absolute right-1 top-1 flex h-[30px] w-[30px] cursor-pointer  items-center justify-center rounded-full bg-black/70"
              >
                <AiFillDelete className="hover:text-red text-white transition-all duration-100 ease-in" />
              </div>
            </div>
          </div>
        )}

        <button
          className="rounded-xl bg-btnblue px-8 py-2 font-semibold text-white hover:bg-btnbluedark focus:bg-btnbluedark disabled:cursor-not-allowed disabled:bg-white/75 disabled:text-black/40"
          type="submit"
          disabled={!name || !description || images.length === 0 || isLoading}
        >
          {chapter ? "Edit Chapter" : "Create Chapter"}
        </button>
      </form>
    </div>
  );
}

const ClearImageButton = ({ onClick }: { onClick: MouseEventHandler }) => (
  <button
    onClick={onClick}
    className="t-white-light hover:t-white absolute right-4 top-4 z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black/60 transition-colors duration-200 hover:bg-black/90 focus:bg-black/90"
  >
    <MdClose size={24} />
  </button>
);
