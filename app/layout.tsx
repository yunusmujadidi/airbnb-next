import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvidres";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences",
  description:
    "Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar />
        <RegisterModal />
        <main>{children}</main>
      </body>
    </html>
  );
}
