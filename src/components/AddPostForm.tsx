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
import { modalPostState, modalTypeState } from "$lib/atoms";
import {
  MdArticle,
  MdBarChart,
  MdClose,
  MdMoreHoriz,
  MdOutlinePhotoSizeSelectActual,
  MdVideocam,
  MdWork,
  MdArrowDropDown,
  MdPublic,
} from "react-icons/md";
import { TiStarburst } from "react-icons/ti";
import Avatar from "$components/Avatar";
import { modalState } from "$lib/atoms";

import {
  useCreatePostMutation,
  useEditPostMutation,
} from "$services/baseApiSlice";
import { uploadOne } from "$lib/utils/uploader";
import toaster from "$lib/utils/toaster";

export default function AddPostForm() {
  const [images, setImages] = useState<File[]>([]);

  const post = useAtomValue(modalPostState);

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

  const onCreatePost = async (data: { input: string }) => {
    if (!session?.user?.uid) return;
    try {
      const body = {
        input: data.input.trim(),
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

          // update feed
          queryClient.setQueryData<Post[]>(["posts"], (old) => [
            payload,
            ...(old ?? []),
          ]);
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

  return (
    <div className="overflow-auto">
      <form
        className="t-primary flex h-full flex-col justify-between"
        onSubmit={handleSubmit(post ? onEditPost : onCreatePost)}
      >
        <div className="flex-grow overflow-y-auto">
          <div className="flex items-center space-x-2 px-4 pt-3">
            <Avatar size={44} />
            <div className="flex flex-col justify-center">
              <h3 className="mb-1 text-base font-semibold">
                {session?.user?.name}
              </h3>
              <button className="card-btn t-secondary flex items-center justify-center rounded-full border border-black/60 px-3 py-1 dark:border-gray-500">
                <MdPublic size={16} />
                <span className="px-2 font-semibold">Anyone</span>
                <MdArrowDropDown size={24} />
              </button>
            </div>
          </div>

          <label className="block px-4 pt-3">
            <span className="sr-only">Post content</span>
            <textarea
              {...register("input")}
              rows={4}
              placeholder="What do you want to talk about?"
              className="w-full resize-none border-none bg-transparent p-2 placeholder-black/60 focus:ring-0 dark:placeholder-white/75"
            />
          </label>

          {images && (
            <div className="relative mx-6 my-3">
              <ClearImageButton
                onClick={(e) => {
                  e.preventDefault();
                  resetField("image");
                  setDataUrl("");
                }}
              />
              {/* <Image
                src={dataUrl}
                alt="Uploaded image"
                width={576}
                height={576}
                className="max-h-96 rounded-lg object-contain"
              /> */}
              <p>{images.length}</p>
            </div>
          )}
        </div>

        <footer className="sticky bottom-0 bg-white dark:bg-dblue">
          <div className="flex justify-between pb-4 pl-4 pr-6 pt-3">
            <div className="flex items-center">
              <label className="t-secondary card-btn label-btn block rounded-xl p-2">
                <span className="sr-only">Choose image</span>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files: File[] = Array.from(e.target.files);
                      setImages(files);
                    }
                  }}
                  className="sr-only"
                />
                <MdOutlinePhotoSizeSelectActual size={24} />
              </label>
              <button className="t-secondary card-btn rounded-xl p-2">
                <MdVideocam size={24} />
              </button>
              <button className="t-secondary card-btn rounded-xl p-2">
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
