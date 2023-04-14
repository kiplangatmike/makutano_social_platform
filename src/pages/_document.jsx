import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="preload"
            href="https://res.cloudinary.com/knackapp/image/upload/w_400/v1655138912/static/hero/aa49leouaiuooipqu0k2.webp"
            as="image"
            media="(min-width: 768px)"
          />
          <meta
            property="og:url"
            content="https://makutano.azurewebsites.net"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Makutano" />
          <meta property="og:locale" content="en_US" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="https://makutano.azurewebsites.net"
          />
          <meta
            property="twitter:url"
            content="https://makutano.azurewebsites.net"
          />
          <meta name="twitter:creator" content="@makutano" />
          {/* pwa tags */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Makutano" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Makutano" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
