import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/context/CartContext"; 
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Delivery App",
  description: "Order delicious meals online with fast delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
            {children}
        </CartProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "bg-white text-gray-900 shadow-lg",
            style: {
              fontFamily: "var(--font-geist-sans)",
              fontSize: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}
