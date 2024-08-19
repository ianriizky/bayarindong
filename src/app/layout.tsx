import NextAuthSessionProvider from "@/provider/NextAuthSessionProvider";
import { theme } from "@/theme/mantine";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL),
  title: `${process.env.NEXT_PUBLIC_APP_NAME} Payment Gateway`,
  description:
    "A simple payment gateway service using Next.js and ElysiaJS made for learning purpose.",
  applicationName: process.env.NEXT_PUBLIC_APP_NAME,
  authors: {
    name: "Septianata Rizky Pratama",
    url: "https://github.com/ianriizky",
  },
  keywords: [
    process.env.NEXT_PUBLIC_APP_NAME,
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

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextAuthSessionProvider session={session}>
          <MantineProvider theme={theme}>
            <Notifications limit={5} />
            {children}
          </MantineProvider>
        </NextAuthSessionProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
