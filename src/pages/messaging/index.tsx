import React from "react";
import classNames from "classnames";
import Layout from "$components/Layout";
import Image from "next/image";

const ChatInterface = () => {
  return (
    <Layout>
      <div className="feed-card flex h-screen flex-col">
        <div className="flex-1 overflow-y-scroll">
          <div className="mt-4 flex items-start justify-end pr-2">
            <div className="mr-4 max-w-xs break-words rounded-lg bg-black px-4 py-2 text-sm shadow-md">
              Hello Liplan?
            </div>
            <Image
              src="https://via.placeholder.com/150"
              className="h-10 w-10 rounded-full"
              alt="Avatar"
            />
          </div>
          <div className="mt-4 flex items-start justify-start pl-2">
            <Image
              src="https://via.placeholder.com/150"
              className="h-10 rounded-full"
              alt="Avatar"
            />
            <div className="ml-4 max-w-xs break-words rounded-lg bg-black px-4 py-2 text-sm shadow-md ">
              Hi, Nyamusi
            </div>
          </div>
        </div>
        <div className="feed-card p-4">
          <form className="flex">
            <input
              type="text"
              className="mr-2 flex-1 rounded-xl bg-gray-200 px-4 py-2 text-black"
              placeholder="Type your message here"
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-500 px-4 py-2 text-white"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatInterface;
