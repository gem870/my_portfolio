import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ProfileBody } from "@/components/ProfileBody";
import { Footter } from "@/components/Footter";
import TopLayer from "@/components/TopLayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E. Victor portfolio",
  description: "I am Victor, a passionate software developer with a love for crafting efficient, user-friendly, and scalable solutions.",
  icons:{
    icon: [`/favicon.ico?v=4`],
    apple: [`/apple-touch-icon.png?v=4`],
    shortcut: [`/apple-touch-icon.png`]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <div className="hidden md:flex h-screen w-full bg-slate-100">
        {/* Profile + Details Section (Visible only on big screens) */}
        <div className=" flex flex-col items-center justify-center ">
        {/* Profile Section (Left) */}
        <ProfileBody/>

      </div>

      {/* Details Section (Right) */}
      <div className="w-2/3 custom-scroll overflow-auto">
          {children}
          <Footter/>
        </div>
      </div>

        {/* Small screen */}
        <div className="md:hidden">
        <TopLayer/>
          {children}
        <Footter/>
        </div>
        
      </body>
    </html>
  );
}
