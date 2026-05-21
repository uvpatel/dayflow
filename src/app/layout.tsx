import type { Metadata } from "next";
import "./globals.css";

import { Navbar }  from "@/components/shared/Navbar"
import { ClerkProvider } from "@clerk/nextjs";
import Footer  from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Dayflow - Human Resource Management System",
  description: "Every workday, perfectly aligned.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <Navbar />
          {children}
           <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
