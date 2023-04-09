import React from "react";
import type { AppProps } from "next/app";
import { useRef } from "react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { makeStore } from "$services/store";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "$styles/globals.css";

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const queryClient = useRef(new QueryClient());

  return (
    <>
      <Head>
        <title>LinkedIn Clone | Next</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Provider store={makeStore}>
          <QueryClientProvider client={queryClient.current}>
            <Hydrate state={dehydratedState}>
              <ThemeProvider attribute="class">
                <ToastContainer
                  position="top-center"
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  transition={Slide}
                  className={"toast-styles"}
                />
                <Component {...pageProps} />
              </ThemeProvider>
            </Hydrate>
            {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
