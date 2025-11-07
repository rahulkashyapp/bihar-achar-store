import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bihar Achar Store - Authentic Homemade Pickles",
  description: "Discover the authentic taste of Bihar with our traditional homemade pickles. Made with fresh ingredients and time-honored recipes. Order now for doorstep delivery!",
  keywords: ["Bihar Achar", "Homemade Pickles", "Indian Pickles", "Traditional Pickles", "Mango Pickle", "Lemon Pickle", "Bihar Food"],
  authors: [{ name: "Bihar Achar Store" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Bihar Achar Store - Authentic Homemade Pickles",
    description: "Discover the authentic taste of Bihar with our traditional homemade pickles. Made with fresh ingredients and time-honored recipes.",
    url: "https://biharachar.com",
    siteName: "Bihar Achar Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bihar Achar Store - Authentic Homemade Pickles",
    description: "Discover the authentic taste of Bihar with our traditional homemade pickles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
