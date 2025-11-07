import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { PERSONAL_INFO, SOCIAL_LINKS, NAVIGATION } from '@/lib/config';
import { FloatingMenu } from '@/components/floating-menu';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { ICON_MAP } from '@/components/icons';

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
          {/* Minimal Floating Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="flex justify-between items-center px-4 py-3">
              {/* Logo/Title */}
              <Link
                href="/"
                className="text-foreground font-bold text-base sm:text-lg hover:text-primary transition-colors"
              >
                <span className="">Shashank Gupta | sgupta.dev</span>
              </Link>

              {/* Floating Menu & Theme Toggle */}
              <div className="flex items-center gap-3 relative z-50">
                <ThemeToggle />
                <FloatingMenu />
              </div>
            </div>
          </nav>

          {/* Add top padding to account for fixed nav */}
          <div className="pt-16">
            {children}
          </div>

          {/* Footer */}
          <footer className="relative overflow-hidden border-t border-border">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
              <div className="grid md:grid-cols-3 gap-12 mb-12">
                {/* About */}
                <div className="space-y-4">
                  <h3 className="text-foreground font-bold text-xl">{PERSONAL_INFO.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {PERSONAL_INFO.tagline}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    {SOCIAL_LINKS.map((link) => {
                      const IconComponent = ICON_MAP[link.icon];
                      return (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.ariaLabel}
                          className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="text-foreground font-semibold text-lg">Quick Links</h4>
                  <ul className="space-y-3">
                    {NAVIGATION.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <h4 className="text-foreground font-semibold text-lg">Get In Touch</h4>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                    {PERSONAL_INFO.availableForWork && (
                      <div className="glass px-4 py-3 rounded-xl inline-flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">Available for opportunities</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
                <p>
                  © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}