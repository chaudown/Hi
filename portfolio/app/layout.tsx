import type { Metadata } from "next";
import { generalSans, fontAwesome } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandon Chau - Product Designer",
  description: "Principal Product Designer portfolio showcasing work in enterprise software, design systems, and product strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${generalSans.variable} ${fontAwesome.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
