import type { Metadata } from "next";
import "./globals.css";
import { PERSONAL_INFO } from '@/lib/config/index';
import { ThemeProvider } from '@/components/theme-provider';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: "Shashank Gupta | sgupta.dev",
  description: PERSONAL_INFO.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <div className="pt-16">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}