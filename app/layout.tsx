import React from "react";
export const dynamic = 'force-dynamic'
import type { Metadata } from "next";
import { Inter, Roboto, Dancing_Script  } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const robo = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-robo',
})
const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dancing',
})
export const metadata: Metadata = {
  title: "Furever Home",
  description: "Furever Home is a platform where you can adopt pets",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancing.variable} ${robo.variable}`}>
        {children}
      </body>
    </html>
  );
}