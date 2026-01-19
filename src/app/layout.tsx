import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SDC Fest 2026 | Shesha College Mysore",
  description: "Welcome to SDC Fest 2026 - The biggest inter-college fest at Shesha College Mysore. Join us for exciting events in IT, Management, Cultural, and Sports!",
  keywords: "SDC Fest, Shesha College, Mysore, College Fest, Hackathon, Cultural, Sports, Inter-college",
  openGraph: {
    title: "SDC Fest 2026 | Shesha College Mysore",
    description: "The biggest inter-college fest at Shesha College Mysore",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
