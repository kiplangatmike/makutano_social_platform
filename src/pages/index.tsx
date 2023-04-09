import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import social_logo from "$public/social_logo.png";
import hero_svg from "$public/hero.svg";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Makutano: Log In or Sign Up | Next</title>
      </Head>

      <header>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="block h-[21px] w-[84px] lg:h-[34px] lg:w-[135px]"
          >
            <Image src={social_logo} alt="makutano logo" />
          </Link>

          <div className="align-center flex items-center divide-amber-800/80 sm:divide-x">
            <div className="pl-4">
              <button
                onClick={() => signIn("google", { callbackUrl: "/feed" })}
                className="rounded-[10px] border border-amber-800/80 px-8 py-1.5 font-semibold text-amber-800/80 transition-all hover:border-amber-800/50"
              >
                Login
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center overflow-hidden">
        <section className="mx-auto flex min-h-[560px] max-w-6xl flex-col items-center px-4 pt-10 md:flex-row">
          <div className="w-full flex-shrink-0 space-y-6 pr-0 md:w-[55%] md:pr-12 lg:space-y-10">
            <h1 className="max-w-xl text-3xl font-extralight !leading-snug text-amber-800/80 md:text-5xl">
              Welcome to the ELP community
            </h1>
            <button
              onClick={() => signIn("google", { callbackUrl: "/feed" })}
              className="rounded-[10px] border border-amber-800/80 px-8 py-2 font-semibold text-amber-800/80 transition-all hover:border-amber-800/50"
            >
              Get started
            </button>
          </div>

          <div className="static -z-[1] mt-8 block h-[214px] w-[374px] flex-shrink md:relative md:mt-0 md:min-h-[540px] md:min-w-[700px]">
            <Image
              src={hero_svg}
              alt="Welcome to your professional community"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
}
