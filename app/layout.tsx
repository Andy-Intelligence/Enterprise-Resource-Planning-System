
import "./globals.css";
import type { Metadata } from "next";
import { Inter,IBM_Plex_Serif } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ClientProvider from "./ClientProvider"; 

const inter = Inter({ subsets: ["latin"],variable:"--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({subsets:['latin'],weight:['400','700'],variable:"--font-ibm-plex-seriff"})

export const metadata: Metadata = {
  title: "ERP",
  description: "PWA ERP application",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  // keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  // authors: [
  //   { name: "Andidiong Usoro" },
  //   {
  //     name: "Andidiong Usoro",
  //     url: "https://www.linkedin.com/in/usoroandidiong/",
  //   },
  // ],
  // viewport:
  //   "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  // icons: [
  //   { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
  //   { rel: "icon", url: "icons/icon-128x128.png" },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
     
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

