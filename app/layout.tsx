import type { Metadata } from "next";
import {Poppins} from "next/font/google"
import "./globals.css";
import Heading from "./Component/Heading";
import Footer from "./Component/Footer";
import Sidebar from "./Component/Sidebar";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Yout Post",
  description: "Post Your Video Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <Heading />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
