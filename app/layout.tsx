import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Setting up the metadata for the app in general.
// I have also added a favicon, using Next.js way of handling it.
export const metadata: Metadata = {
  title: "Vejrudsigt",
  description: "Vejrudsigts kodetest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-900 text-white p-6`}
      >
        {children}
      </body>
    </html>
  );
}
