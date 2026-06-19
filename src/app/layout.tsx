import type { Metadata } from "next";
import { PT_Mono } from "next/font/google";
import "./globals.css";

const ptMono = PT_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pt-mono",
});

export const metadata: Metadata = {
  title: "AI Engineer Portfolio",
  description: "I build AI apps that actually ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ptMono.variable} antialiased bg-page-base text-gray-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
