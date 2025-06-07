import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/sessionProvide";
import ProjectProvider from "@/providers/PageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jotion",
  description: "Create you notes with Jotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en" >
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-black`}
          >
            <Provider>
              <ProjectProvider>
                {children}
              </ProjectProvider>
            </Provider>
          </body>
        </html>
    
  );
}
