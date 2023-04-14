import Head from "next/head";
import React from "react";

export default function HeaderSeo({
  title = "Makutano: Welcome to the ELP community",
  description = "Makutano connects the ELP community through a modern, intuitive, and easy-to-use platform. Join the community today!",
  image = "https://res.cloudinary.com/dpnbddror/image/upload/v1681470828/media/Screenshot_from_2023-04-14_13-13-12_bbpd1j.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1 maximum-scale=1 user-scalable=no"
      />
    </Head>
  );
}
