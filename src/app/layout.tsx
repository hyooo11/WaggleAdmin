import StoreProvider from "@/redux/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/component/common/SideBar";
import GlovalTop from "@/component/common/GlovalTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "와글와글 관리자 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <StoreProvider>
          <div className="gloval-wrap">
            <div className="gloval-twotone">
              <div className="__top"></div>
              <div className="__bottom"></div>
            </div>
            <div className="gloval-page">
              <SideBar />
              {children}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
