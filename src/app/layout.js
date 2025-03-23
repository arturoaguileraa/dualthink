import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "El Corte Inglés - DualThink",
  description: "Prototype for Innovation Flash Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-green-50 ${geistSans.variable} ${geistMono.variable} pb-14 antialiased`}
      >
        {children}
        <Navbar></Navbar>
      </body>
    </html>
  );
}
