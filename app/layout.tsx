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
  metadataBase: new URL('https://snowyjs.lol'),
  title: {
    default: 'AJ',
    template: '%s | AJ'
  },
  description: 'my personal portfolio.',
  openGraph: {
    title: 'AJ',
      description: 'Personal portfolio for AJ, featuring projects, GitHub activity, and work experience.',
    url: 'https://snowyjs.lol',
    siteName: 'AJ Portfolio',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AJ',
    description: 'my personal portfolio.'
  }
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