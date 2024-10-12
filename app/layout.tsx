export const dynamic = 'force-dynamic'
import type { Metadata } from "next";
import { Inter, Roboto } from 'next/font/google';
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

export const metadata: Metadata = {
  title: "Adopt Me",
  description: "NxtGen is a simple, easy-to-use modernized banking platform for small businesses.",
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
      <body className={`${inter.className} ${robo.variable}`}>
        {children}
      </body>
    </html>
  );
}