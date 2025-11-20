import localFont from 'next/font/local';

/**
 * General Sans - Variable Font
 * Supports all weights (400-700), we use:
 * - 500 (Medium) for body text
 * - 600 (Semibold) for headings and bold text
 */
export const generalSans = localFont({
  src: '../public/fonts/general-sans/GeneralSans-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '400 700', // Variable font weight range
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

/**
 * Font Awesome 6 Pro - Solid
 * Weight 900 (Black) for icons
 */
export const fontAwesome = localFont({
  src: '../public/fonts/font-awesome/FontAwesome6Pro-Solid.woff2',
  variable: '--font-icon',
  display: 'block', // Icons should block to prevent FOIT
  weight: '900',
  fallback: ['sans-serif'],
});
