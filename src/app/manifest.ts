import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${process.env.NEXT_PUBLIC_APP_NAME} Payment Gateway`,
    short_name: process.env.NEXT_PUBLIC_APP_NAME,
    description:
      "A simple payment gateway service using Next.js and ElysiaJS made for learning purpose.",
    start_url: "/",
    display: "standalone",
    background_color: "#fd7e14",
    theme_color: "#ffd700",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
