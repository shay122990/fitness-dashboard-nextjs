import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import Providers from "../providers";
import ClientSideWrapper from "./clientSideWrapper";
import Sidebar from "./components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Today - A Fitness Planner",
  description: "One stop to plan your workouts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.png" type="image/x-icon" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0A04FF" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ClientSideWrapper>
            <div className="flex h-screen">
              <div
                className="h-screen w-[100px] lg:w-[150px]"
                style={{
                  background:
                    "linear-gradient(35deg, rgba(0,18,255,1) 0%, rgba(3,0,132,1) 40%, rgba(1,0,39,1) 100%)",
                }}
              >
                <Sidebar />
              </div>
              <main
                className="flex-1 items-center overflow-y-auto p-4 lg:p-10"
                style={{
                  background:
                    "radial-gradient(circle, rgba(10,4,255,1) 3%, rgba(0,19,60,1) 100%, rgba(8,56,161,1) 131%)",
                }}
              >
                {children}
              </main>
            </div>
          </ClientSideWrapper>
        </Providers>
      </body>
    </html>
  );
}
