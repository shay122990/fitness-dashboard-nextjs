import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import Providers from "../providers";
import ClientSideWrapper from './clientSideWrapper'; 
import Sidebar from './components/Sidebar';

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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <Providers>
          <ClientSideWrapper>
            <Sidebar />
            <main className="flex-1 ml-24 sm:ml-32 md:ml-48 lg:ml-60 overflow-y-auto">
              {children}
            </main>
          </ClientSideWrapper>
        </Providers>
      </body>
    </html>
  );
}
