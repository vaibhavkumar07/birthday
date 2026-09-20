import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Har janam, tum. — Happy birthday, Pragya",
  description: "A little universe for Pragya. September 22, 2026.",
  robots: { index: false, follow: false },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi-Latn">
      <body className="antialiased">{children}</body>
    </html>
  );
}
