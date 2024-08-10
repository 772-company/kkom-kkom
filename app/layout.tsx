import Header from "@/components/header/header";
import {
  OverlayProvider,
  OverlayStoreProvider,
} from "@/providers/modal-store-provider";
import ToastProvider from "@/providers/toast-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

import QueryProviders from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | 꼼꼼",
    default: "꼼꼼",
  },
  description: "꼼꼼이가 되기 위한 애플리케이션",
};

const myFont = localFont({
  src: "./_fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={myFont.className}>
        <QueryProviders>
          <ToastProvider>
            <OverlayStoreProvider>
              <Header />
              <main className="min-h-screen bg-background-primary pt-[60px] antialiased">
                {children}
              </main>
              <OverlayProvider />
            </OverlayStoreProvider>
          </ToastProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
