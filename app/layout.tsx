import type { Metadata } from "next";
import "./globals.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { AddCartContextProvider } from "@/context/AddCartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiniMart",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col justify-between antialiased`}
      >
        <AddCartContextProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </AddCartContextProvider>
      </body>
    </html>
  );
}
