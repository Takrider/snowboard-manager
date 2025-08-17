import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snowboard Manager",
  description: "Manage your snowboards and their conditions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
