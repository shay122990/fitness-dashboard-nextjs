import { Metadata } from "next";
import "./globals.css";
import Providers from "../providers";
import ClientSideWrapper from "./clientSideWrapper";
import Sidebar from "./components/Sidebar";
import { Open_Sans, Montserrat, Roboto, Kanit } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const kanit = Kanit({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kanit" });

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
    <html lang="en" className={`${openSans.variable} ${montserrat.variable} ${roboto.variable} ${kanit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" charSet="UTF-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A04FF" />
      </head>
      <body>
        <Providers>
          <ClientSideWrapper>
            <div className="flex h-screen">
              <div className="h-screen fixed left-0 top-0 z-10">
                <Sidebar />
              </div>
              <main 
                className="flex-1 lg:w-4/5 p-2 lg:p-3 h-screen overflow-y-auto lg:ml-[150px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,106,253,1) 0%, rgba(4,11,36,1) 84%)",
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
