import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { getSiteSettings } from "@/lib/getSettings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: "https://luxefurnishings.com",
      siteName: settings.brandName,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}>
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --color-brand-gold: ${settings.primaryColor};
            --color-brand-cream: ${settings.backgroundColor};
            --background: ${settings.backgroundColor};
          }
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-dark">
        {children}
      </body>
    </html>
  );
}
