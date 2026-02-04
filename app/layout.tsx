import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Gaegu, Gowun_Dodum } from "next/font/google"; // 다시 고운 돋움으로 변경
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif",
});

const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
});

const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gowun",
});

export const metadata: Metadata = {
  title: "자격증공장 | Study Factory",
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
      <body className={`${notoSansKr.variable} ${notoSerifKr.variable} ${gaegu.variable} ${gowunDodum.variable} font-sans antialiased text-slate-800 bg-white`}>
        <EntranceOverlay />
        {children}
      </body>
    </html>
  );
}
