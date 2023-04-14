import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import social_logo from "$public/makutano.svg";
import logoo from "$public/logoo.jpg";
import hero_svg from "$public/hero.svg";
import HeaderSeo from "$components/head";

export default function Home() {
  return (
    <main className="h-full w-full">
      <HeaderSeo />

      <header>
        <nav className="mx-auto flex items-center justify-between px-8 py-4">
          <Link
            href="/"
            className="flex h-[21px] w-[84px] items-center lg:h-[34px] lg:w-[135px]"
          >
            <Image src={social_logo} alt="makutano logo" />
          </Link>

          <div className="align-center flex items-center divide-amber-800/80 sm:divide-x">
            <div className="pl-4">
              <button
                onClick={() => signIn("google", { callbackUrl: "/feed" })}
                className="rounded-[10px] border border-amber-800/80 px-8 py-1.5 font-semibold text-amber-800/80 transition-all hover:bg-amber-800 hover:text-white"
              >
                Login
              </button>
            </div>
          </div>
        </nav>
      </header>

      <section className="flex flex-col items-center overflow-hidden">
        <section className="mx-auto flex min-h-[560px] max-w-6xl flex-col items-center px-4 pt-10 md:flex-row">
          <div className="w-full flex-shrink-0 space-y-4 pr-0 md:w-[55%] md:pr-12 lg:space-y-7">
            <h1 className="max-w-xl text-3xl font-semibold text-amber-800/80 md:text-5xl">
              Welcome to the ELP community
            </h1>
            <p className="text-amber-800/80">Feel at home!</p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/feed" })}
              className="rounded-[10px] border border-amber-800/80 px-8 py-2 font-semibold text-amber-800/80 transition-all hover:bg-amber-800 hover:text-white"
            >
              Join the community
            </button>
          </div>

          <div className="static -z-[1] mt-8 block h-[214px] w-[374px] flex-shrink md:relative md:mt-0 md:min-h-[550px] md:min-w-[700px]">
            <Image
              src={
                "https://res.cloudinary.com/dpnbddror/image/upload/v1681470984/media/hero_sjzy0n.svg"
              }
              alt="Welcome to the ELP community"
              priority
              width={680}
              height={850}
              sizes="(max-width: 768px) 100vw, 680px"
            />
          </div>
        </section>
      </section>
    </main>
  );
}
