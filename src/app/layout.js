import { Geist, Geist_Mono, Jua } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Dice Pop",
  description: "A fun dice game for two players or play against a bot",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jua.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/background.jpg" as="image" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
