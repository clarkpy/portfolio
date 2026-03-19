import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "AJ",
  description: "welcome to my site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} antialiased` }
        style={{ margin: 0, padding: 0, backgroundColor: '#13111C' }}
      >
        <div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}