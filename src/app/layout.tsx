import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Sử dụng đường dẫn khớp với cấu trúc thư mục hiện tại của bạn
import { NextAuthProvider } from "../components/providers/NextAuthProvider";
import Navbar from "../components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cập nhật thông tin dự án của bạn
export const metadata: Metadata = {
  title: "Làng Việt - Game Thẻ Bài Chiến Thuật",
  description: "Xây dựng và phát triển làng quê Việt Nam qua những thẻ bài độc đáo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          {/* Navbar sẽ xuất hiện ở mọi trang */}
          <Navbar />
          <main>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}