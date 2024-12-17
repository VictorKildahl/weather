import { LucideWaves } from "lucide-react";
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
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-900 text-white`}
      >
        <header className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center py-6">
          <LucideWaves className="h-8 w-8 text-yellow-400" />
          <h1 className="text-xl font-semibold ml-2 text-white">
            Better Weather
          </h1>
        </header>
        <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
