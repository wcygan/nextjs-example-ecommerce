import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/cart";
import { Header } from "@/components/layout/Header";
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
  title: "Modern Home Store",
  description: "Curated collection of modern home goods and furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <Header />
            <main>{children}</main>
            {/* TODO: Add Footer component */}
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
