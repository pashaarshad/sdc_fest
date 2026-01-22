import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHRESHTA 2026 | Seshadripuram Degree College, Mysuru",
  description: "SHRESHTA 2026 - The Inter-College Fest at Seshadripuram Degree College, Mysuru. Join us on 17th February 2026 for exciting events in IT, Management, Cultural, and Sports!",
  keywords: "SHRESHTA, Seshadripuram Degree College, SDC, Mysuru, College Fest, Inter-college, IT Events, Cultural Events, Sports",
  openGraph: {
    title: "SHRESHTA 2026 | Seshadripuram Degree College, Mysuru",
    description: "The Inter-College Fest at SDC Mysuru - 17th February 2026",
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
