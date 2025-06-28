import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/ui/Navigation";
import SessionProvider from "@/components/providers/SessionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SEA Catering - Healthy Meals, Anytime, Anywhere",
  description: "SEA Catering provides customizable healthy meal plans delivered across Indonesia. Enjoy fresh, nutritious meals with detailed nutritional information and flexible delivery options.",
  keywords: "healthy meals, meal delivery, Indonesia, customizable meals, nutrition, food delivery, SEA Catering",
  authors: [{ name: "SEA Catering Team" }],
  creator: "SEA Catering",
  publisher: "SEA Catering",
  openGraph: {
    title: "SEA Catering - Healthy Meals, Anytime, Anywhere",
    description: "Premium healthy meal delivery service across Indonesia",
    url: "https://sea-catering.com",
    siteName: "SEA Catering",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEA Catering - Healthy Meals, Anytime, Anywhere",
    description: "Premium healthy meal delivery service across Indonesia",
    creator: "@seacatering",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body 
        className={`${inter.className} antialiased`} 
        suppressHydrationWarning
      >
        <SessionProvider>
          <ToastProvider>
            <div suppressHydrationWarning>
              <Navigation />
              {children}
            </div>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
