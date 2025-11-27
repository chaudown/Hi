'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Text } from './Text';

/**
 * ThemeToggle component
 * Allows users to toggle between light, dark, and system theme
 *
 * Displays current theme and cycles through options on click
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: log theme changes
  useEffect(() => {
    if (mounted) {
      console.log('Theme changed:', {
        theme,
        resolvedTheme,
        htmlClass: document.documentElement.className,
        htmlClassList: Array.from(document.documentElement.classList),
        hasDarkClass: document.documentElement.classList.contains('dark')
      });
    }
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-[var(--spacing-2x)] px-[var(--spacing-4x)] py-[var(--spacing-2x)] border border-neutral-6 rounded-[var(--spacing-1x)]">
        <Text variant="small" as="span">Theme:</Text>
        <Text variant="small" as="span" className="text-muted">Loading...</Text>
      </div>
    );
  }

  const cycleTheme = () => {
    console.log('Cycling theme from:', theme);
    let nextTheme: string;
    if (theme === 'light') {
      nextTheme = 'dark';
    } else if (theme === 'dark') {
      nextTheme = 'system';
    } else {
      nextTheme = 'light';
    }
    setTheme(nextTheme);

    // Force class update after a brief delay
    setTimeout(() => {
      const shouldHaveDark = nextTheme === 'dark' || (nextTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (shouldHaveDark && !document.documentElement.classList.contains('dark')) {
        console.log('Manually adding dark class');
        document.documentElement.classList.add('dark');
      } else if (!shouldHaveDark && document.documentElement.classList.contains('dark')) {
        console.log('Manually removing dark class');
        document.documentElement.classList.remove('dark');
      }
    }, 100);
  };

  const displayTheme = theme || 'system';

  return (
    <button
      onClick={cycleTheme}
      className="inline-flex items-center gap-[var(--spacing-2x)] px-[var(--spacing-4x)] py-[var(--spacing-2x)] border border-neutral-6 rounded-[var(--spacing-1x)] hover:bg-neutral-2 transition-colors"
      aria-label="Toggle theme"
      title={`Current: ${displayTheme}, Resolved: ${resolvedTheme}`}
    >
      <Text variant="small" as="span">Theme:</Text>
      <Text variant="small" as="span" className="font-bold">
        {displayTheme === 'light' && '☀️ Light'}
        {displayTheme === 'dark' && '🌙 Dark'}
        {displayTheme === 'system' && '⚙️ System'}
      </Text>
      <Text variant="small" as="span" className="text-muted">
        ({resolvedTheme})
      </Text>
    </button>
  );
}
