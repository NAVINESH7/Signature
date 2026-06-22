import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const luxuryFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-luxury",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Signature | Luxury Silk Sarees",
    template: "%s | Signature",
  },
  description:
    "Premium Kanchipuram, Banarasi, bridal and wedding silk sarees crafted for treasured occasions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${luxuryFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}