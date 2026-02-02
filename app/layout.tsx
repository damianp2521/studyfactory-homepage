import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "자격증공장 | License Factory",
  description: "고통스러운 공부는 그만! 행복한 공부를 해야 합격한다. 프리미엄 관리형 스터디카페.",
  icons: {
    icon: "/logo_graphic.png",
  },
};

import EntranceOverlay from "@/components/EntranceOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKr.variable} font-sans antialiased text-slate-800 bg-white`}>
        <EntranceOverlay />
        {children}
      </body>
    </html>
  );
}
