'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

/**
 * ThemeProvider component
 * Wraps the app with next-themes for light/dark mode support
 *
 * Configuration:
 * - attribute="class" - Uses .dark class on <html> element
 * - defaultTheme="system" - Defaults to OS preference
 * - enableSystem - Allows system theme detection
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="portfolio-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
