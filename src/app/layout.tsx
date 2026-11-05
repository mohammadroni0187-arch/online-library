import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/ReactToastify.css";
import { TooltipProvider } from "@/components/ui/tooltip"
import Navber from "@/component/Navber";
import Footer from "@/component/Footer";
import ToastProvider from "@/component/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BookNook – A Small Online Library",
    template: "%s | BookNook",
  },
  description:
    "BookNook is a small online library where you can explore, borrow, return and share books.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navber/>
        <TooltipProvider>{children}</TooltipProvider>
        <Footer/>
        <ToastProvider />
      </body>
    </html>
  );
}
