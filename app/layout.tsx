import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CommerceProvider } from "@/lib/use-commerce";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "NOIRE | Premium Fashion E-Commerce",
  description: "A concept fashion commerce project designed and developed by Levion."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <CommerceProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CommerceProvider>
      </body>
    </html>
  );
}
