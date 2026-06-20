import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/user/frontend/context/AuthContext";

/* =====================================
   FONTS
===================================== */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/* =====================================
   METADATA
===================================== */

export const metadata: Metadata = {
  title: {
    default: "SIGNATURE | Luxury Silk Sarees",
    template: "%s | SIGNATURE",
  },

  description:
    "Discover handcrafted luxury silk sarees inspired by timeless heritage, bridal elegance, and timeless craftsmanship.",

  keywords: [
    "Luxury Silk Sarees",
    "Bridal Sarees",
    "Kanchipuram Sarees",
    "Banarasi Sarees",
    "Wedding Sarees",
    "Premium Sarees",
    "SIGNATURE",
  ],

  applicationName: "SIGNATURE",

  authors: [
    {
      name: "SIGNATURE",
    },
  ],

  creator: "SIGNATURE",

  openGraph: {
    title: "SIGNATURE | Luxury Silk Sarees",
    description:
      "Luxury silk sarees crafted with heritage, elegance and timeless artistry.",
    siteName: "SIGNATURE",
    type: "website",
  },
};

/* =====================================
   ROOT LAYOUT
===================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html
  lang="en"
  data-scroll-behavior="smooth"
  className={`
    ${geistSans.variable}
    ${geistMono.variable}
    ${playfair.variable}
  `}
>
      <body
        className="
          min-h-screen
          bg-[#F8F6F2]
          text-[#111111]
          font-(--font-geist-sans)
        "
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}