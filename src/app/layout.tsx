import { theme } from "@/theme/mantine";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Bayarindong Payment Gateway",
  description:
    "A simple payment gateway service using Next.js and ElysiaJS made for learning purpose.",
  applicationName: "Bayarindong",
  authors: {
    name: "Septianata Rizky Pratama",
    url: "https://github.com/ianriizky",
  },
  keywords: [
    "Bayarindong",
    "Payment Gateway",
    "JavaScript",
    "Node.js",
    "Next.js",
    "ElysiaJS",
    "PostgreSQL",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffd700",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
