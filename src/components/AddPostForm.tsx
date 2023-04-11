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
import { modalPostState, postForChapters } from "$lib/atoms";
import {
  MdClose,
  MdOutlinePhotoSizeSelectActual,
  MdVideocam,
  MdWork,
  MdArrowDropDown,
  MdPublic,
  MdCheck,
} from "react-icons/md";
import { TiStarburst } from "react-icons/ti";
import Avatar from "$components/Avatar";
import { modalState } from "$lib/atoms";

import {
  useCreatePostMutation,
  useEditPostMutation,
  useGetAllChaptersQuery,
} from "$services/baseApiSlice";
import { uploadOne } from "$lib/utils/uploader";
import toaster from "$lib/utils/toaster";

import { useDropzone } from "react-dropzone";
import { AiFillDelete } from "react-icons/ai";
import { Chapters } from "@prisma/client";
import { useRouter } from "next/router";

export default function AddPostForm() {
  const [images, setImages] = useState<File[]>([]);

  const post = useAtomValue(modalPostState);
  const isForChapter = useAtomValue(postForChapters);

  useEffect(() => {
    if (post) {
      reset({
        input: post.input,
      });
    }
  }, [post]);

  const queryClient = useQueryClient();
  const setModalOpen = useSetAtom(modalState);
  const [dataUrl, setDataUrl] = useState("");
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

  const [createPost] = useCreatePostMutation();
  const [editPost] = useEditPostMutation();

  const uploadMedia = async (files: File[]) => {
    //  upload files, use async method - uploadOne
    const responses = await Promise.all(
      files.map((file: File) => uploadOne(file))
    ).catch((error) => {
      console.log(error);
    });

    return responses;
  };

  const setIsForChapters = useSetAtom(postForChapters);

  const [selectedChapter, setSelectedChapter] = useState("");

  const router = useRouter();

  const onCreatePost = async (data: { input: string }) => {
    if (!session?.user?.uid) return;
    try {
      const body = {
        input: data.input.trim(),
        chapterId: isForChapter?.length > 0 ? isForChapter : undefined,
      };

      await createPost(body)
        .unwrap()
        .then((payload) => {
          // upload images
          if (images.length > 0) {
            uploadMedia(images).then((res) => {
              axios.patch(`/api/posts/${payload.id}`, {
                media: res,
              });
            });
          }
          // play ding.mp3
          const ding = new Audio("/ding.mp3");
          // volume 50%
          ding.volume = 0.5;
          ding.play();
          // update feed
          queryClient.setQueryData<Post[]>(["posts"], (old) => [
            payload,
            ...(old ?? []),
          ]);
          setIsForChapters("");

          const isViewChapter = router.query?.chapterId;

          if (
            (isForChapter?.length > 0 &&
              router.pathname.includes("chapters")) ||
            (selectedChapter?.length > 0 && isViewChapter)
          ) {
            const url = `/chapters/${
              isForChapter?.length > 0 ? isForChapter : isViewChapter
            }?refetchPosts=true`;
            router.push(url);
          }
          toaster({
            status: "success",
            message: "Post created successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          toaster({
            status: "error",
            // @ts-ignore
            message: error ?? "Error while creating post. Try again later.",
          });
        });

      reset();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toaster({
        status: "error",
        // @ts-ignore
        message: error ?? "Error while creating post. Try again later.",
      });
    }
  };

  const onEditPost = async (data: { input: string }) => {
    if (!session?.user?.uid) return;
    try {
      const body = {
        input: data.input.trim(),
      };

      const id = post?.id;

      await editPost({ id, body })
        .unwrap()
        .then((payload) => {
          // upload images
          if (images.length > 0) {
            uploadMedia(images).then((res) => {
              axios.patch(`/api/posts/${payload.id}`, {
                media: res,
              });
            });
          }
          toaster({
            status: "success",
            message: "Post edited successfully",
          });
          // update feed
          queryClient.setQueryData<Post[]>(["posts"], (old) => [
            payload,
            ...(old ?? []),
          ]);
        })
        .catch((error) => {
          console.log(error);
          toaster({
            status: "error",
            // @ts-ignore
            message: error ?? "Error while editing post. Try again later.",
          });
        });

      reset();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toaster({
        status: "error",
        // @ts-ignore
        message: error ?? "Error while editing post. Try again later.",
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

  const [showChapters, setShowChapters] = useState(false);

  const { data: allChapters, isFetching } = useGetAllChaptersQuery(undefined);

  const [currentUserJoinedChapters, setCurrentUserJoinedChapters] = useState(
    []
  );

  useEffect(() => {
    // check all chapters where chapter.userIds contains current user id
    if (allChapters) {
      const joinedChapters = allChapters.filter((chapter: Chapters) =>
        chapter.userIds.includes(session?.user?.uid as string)
      );
      setCurrentUserJoinedChapters(joinedChapters);
    }
  }, [allChapters]);

  return (
    <div className="overflow-auto dark:bg-gray-900">
      <form
        className="t-primary dark:bg-gray-900 flex h-full flex-col justify-between"
        onSubmit={handleSubmit(post ? onEditPost : onCreatePost)}
      >
        <div className="flex-grow overflow-y-auto">
          <div className="flex items-center space-x-2 px-4 pt-3">
            <Avatar size={44} />
            <div className="flex flex-col justify-center">
              <h3 className="mb-1 text-base font-semibold">
                {session?.user?.name}
              </h3>
              {!isForChapter && currentUserJoinedChapters?.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowChapters(false);
                      setSelectedChapter("");
                    }}
                    className={`card-btn t-secondary flex items-center justify-center rounded-full px-3 py-1 ${
                      selectedChapter.length > 0 ? "" : "bg-blue-400/25"
                    }`}
                  >
                    <MdPublic size={16} />
                    <span className="px-2 font-semibold ">Anyone</span>
                    {selectedChapter.length === 0 && <MdCheck />}
                  </button>
                  <div
                    className={`card-btn t-secondary relative flex items-center justify-center rounded-full border border-black/60 px-3 py-1 dark:border-gray-500 ${
                      selectedChapter.length > 0 ? "bg-amber-700" : ""
                    }`}
                  >
                    <svg
                      onClick={() => setShowChapters(!showChapters)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0017.5 5h-4zm-10 7A1.5 1.5 0 002 13.5v2A1.5 1.5 0 003.5 17h6a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 009.5 12h-6z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span
                      onClick={() => setShowChapters(!showChapters)}
                      className="px-2 font-semibold"
                    >
                      {selectedChapter?.length > 0
                        ? selectedChapter
                        : "Chapter"}
                    </span>
                    {selectedChapter?.length === 0 ? (
                      <MdArrowDropDown
                        onClick={() => setShowChapters(!showChapters)}
                        size={24}
                      />
                    ) : (
                      <MdCheck />
                    )}
                    {showChapters && (
                      <div className="absolute top-10 flex h-max flex-col rounded-md bg-slate-600 px-1 py-2 text-xs">
                        {currentUserJoinedChapters.map((chapter: Chapters) => (
                          <p
                            onClick={() => {
                              setSelectedChapter(chapter.name);
                              setShowChapters(false);
                            }}
                            key={chapter?.id}
                            className="w-max cursor-pointer rounded p-1 px-2 hover:bg-slate-500"
                          >
                            {chapter?.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <label className="block px-4 pt-3">
            <span className="sr-only">Post content</span>
            <textarea
              {...register("input")}
              rows={4}
              autoFocus
              placeholder="What do you want to talk about?"
              className="w-full resize-none border-none bg-transparent p-2 placeholder-black/60 focus:border-none focus:ring-0 dark:placeholder-white/75"
            />
          </label>

          {images.length > 0 && (
            <div className="relative mx-6 my-3">
              <ClearImageButton
                onClick={(e) => {
                  e.preventDefault();
                  resetField("image");
                  setDataUrl("");
                  setImages([]);
                }}
              />
              <div
                style={{
                  backgroundImage: `url(${
                    // @ts-ignore
                    images.length > 0 ? images[0]?.preview : ""
                  })`,
                }}
                className={`relative flex h-[70px] w-[100px] items-center justify-center rounded-[10px] bg-cover bg-center transition-all duration-300 ease-in`}
              >
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    resetField("image");
                    setDataUrl("");
                    setImages([]);
                  }}
                  className="absolute right-1 top-1 flex h-[30px] w-[30px] cursor-pointer  items-center justify-center rounded-full bg-black/70"
                >
                  <AiFillDelete className="hover:text-red text-white transition-all duration-100 ease-in" />
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="sticky bottom-0 bg-white dark:bg-dblue">
          <div className="flex justify-between pb-4 pl-4 pr-6 pt-3">
            <div className="flex items-center">
              <label
                {...getRootProps()}
                className="t-secondary card-btn label-btn block rounded-xl p-2"
              >
                <span className="sr-only">Choose image</span>
                <input {...getInputProps()} />
                <MdOutlinePhotoSizeSelectActual size={24} />
              </label>
              <button className="t-secondary card-btn hidden rounded-xl p-2">
                <MdVideocam size={24} />
              </button>
              <button className="t-secondary card-btn hidden rounded-xl p-2">
                <MdWork size={24} />
              </button>
            </div>
            <button
              className="rounded-xl bg-btnblue px-8 py-2 font-semibold text-white hover:bg-btnbluedark focus:bg-btnbluedark disabled:cursor-not-allowed disabled:bg-white/75 disabled:text-black/40"
              type="submit"
              disabled={!watch("input")?.trim() || isSubmitting}
            >
              {post ? "Edit post" : "Post"}
            </button>
          </div>
        </footer>
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
