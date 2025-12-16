import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISTA - Vehicle Intelligence System",
  description: "Vehicle Intelligence System for Telematics & Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
