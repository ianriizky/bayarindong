import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bayarindong Payment Gateway",
  description:
    "A simple payment gateway service using Next.js made for learning purpose.",
  applicationName: "Bayarindong",
  authors: {
    name: "Septianata Rizky Pratama",
    url: "https://github.com/ianriizky",
  },
  keywords: [
    "Frontend",
    "Bayarindong",
    "Payment Gateway",
    "JavaScript",
    "Node.js",
    "Next.js",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffd700",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
