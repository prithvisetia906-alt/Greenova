import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "Custom Organic Farming Kits | Grow Your Own, Your Way",
    template: "%s | Greenova",
  },
  description: "Build customizable farming kits with seeds, soil, organic fertilizers and plant-care essentials for home gardens and small farms.",
  keywords: [
    "organic farming kits",
    "customizable gardening kits",
    "home gardening",
    "balcony gardening",
    "terrace gardening",
    "organic seeds",
    "organic soil",
    "organic fertilizer",
    "natural pest control",
    "grow your own food",
    "small farm supplies",
  ],
  authors: [{ name: "Greenova" }],
  creator: "Greenova",
  publisher: "Greenova",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://greenova.in",
    siteName: "Greenova",
    title: "Custom Organic Farming Kits | Grow Your Own, Your Way",
    description: "Build customizable farming kits with seeds, soil, organic fertilizers and plant-care essentials for home gardens and small farms.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greenova - Custom Organic Farming Kits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Organic Farming Kits | Grow Your Own, Your Way",
    description: "Build customizable farming kits with seeds, soil, organic fertilizers and plant-care essentials for home gardens and small farms.",
    images: ["/images/og-image.jpg"],
    creator: "@greenova",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1D16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}