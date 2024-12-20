import React from "react";
import type { Metadata } from "next";
import { Merriweather } from "next/font/google";

import ReactQueryProvider from "@/src/provider/ReactQueryProvider";

import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const fetchCache = "default-cache";

export const metadata: Metadata = {
  title: "Jake History",
  description: "Developer's Personal Blog and Records",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "BVoYzv4F0_DZfKPHAbx4D-NhZ9TLxr_KYqxwzevCSAU",
  },
};

type Props = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export default function RootLayout({ children, header }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css" />
        <title>jake history</title>
      </head>
      <body className={`${merriweather.className}`}>
        <ReactQueryProvider>
          {header}
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
