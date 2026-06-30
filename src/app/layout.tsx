import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRIP Insight | Interactive Research Report",
  description:
    "An interactive reading portfolio for Retrieval as Generation with self-triggered information planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
