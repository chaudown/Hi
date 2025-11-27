import { Heading, Text, ThemeToggle } from '@/components/atoms';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-[var(--spacing-6x)] py-[var(--spacing-16x)]">
        {/* Typography System Test */}
        <section className="mb-[var(--spacing-16x)]">
          <div className="flex items-start justify-between mb-[var(--spacing-6x)]">
            <Heading level={1}>
              Design System Test
            </Heading>
            <ThemeToggle />
          </div>
          <Text variant="regular" className="mb-[var(--spacing-8x)]">
            This page demonstrates the design system built from Figma tokens.
            All styles use the 4px spacing grid and map directly to the design system.
            Use the theme toggle above to switch between light, dark, and system modes.
          </Text>
        </section>

        {/* Color System Section */}
        <section className="mb-[var(--spacing-16x)]">
          <Heading level={2} className="mb-[var(--spacing-6x)]">
            Color System
          </Heading>

          {/* Neutral Colors */}
          <div className="mb-[var(--spacing-8x)]">
            <Heading level={4} className="mb-[var(--spacing-4x)]">
              Neutral Scale (12 Steps)
            </Heading>
            <Text variant="small" className="text-muted mb-[var(--spacing-4x)]">
              Automatic light/dark mode support — values shown adapt to system preference
            </Text>
            <div className="grid grid-cols-6 gap-[var(--spacing-3x)]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div key={num} className="space-y-[var(--spacing-2x)]">
                  <div
                    className={`h-[var(--spacing-16x)] rounded-[var(--spacing-1x)] border border-neutral-6`}
                    style={{ backgroundColor: `var(--neutral-${num})` }}
                  />
                  <Text variant="small" className="text-center">
                    {num}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <Heading level={4} className="mb-[var(--spacing-4x)]">
              Semantic Colors
            </Heading>
            <div className="space-y-[var(--spacing-3x)]">
              <div className="flex items-center gap-[var(--spacing-4x)]">
                <div
                  className="w-[var(--spacing-12x)] h-[var(--spacing-12x)] rounded-[var(--spacing-1x)] border border-neutral-6"
                  style={{ backgroundColor: 'var(--background)' }}
                />
                <div>
                  <Text variant="bold">Background</Text>
                  <Text variant="small" className="text-muted">Page background color</Text>
                </div>
              </div>
              <div className="flex items-center gap-[var(--spacing-4x)]">
                <div
                  className="w-[var(--spacing-12x)] h-[var(--spacing-12x)] rounded-[var(--spacing-1x)] border border-neutral-6"
                  style={{ backgroundColor: 'var(--foreground)' }}
                />
                <div>
                  <Text variant="bold">Foreground</Text>
                  <Text variant="small" className="text-muted">Primary text color</Text>
                </div>
              </div>
              <div className="flex items-center gap-[var(--spacing-4x)]">
                <div
                  className="w-[var(--spacing-12x)] h-[var(--spacing-12x)] rounded-[var(--spacing-1x)] border border-neutral-6"
                  style={{ backgroundColor: 'var(--muted)' }}
                />
                <div>
                  <Text variant="bold">Muted</Text>
                  <Text variant="small" className="text-muted">Secondary text color</Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Headings Section */}
        <section className="mb-[var(--spacing-16x)]">
          <Heading level={2} className="mb-[var(--spacing-6x)]">
            Heading Levels
          </Heading>

          <div className="space-y-[var(--spacing-8x)]">
            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Heading 1 — 60px / 63px / 600 / -3px letter-spacing
              </Text>
              <Heading level={1}>
                The Quick Brown Fox Jumps
              </Heading>
            </div>

            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Heading 2 — 48px / 55.2px / 600 / -2.4px letter-spacing
              </Text>
              <Heading level={2}>
                The Quick Brown Fox Jumps Over
              </Heading>
            </div>

            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Heading 3 — 36px / 41.4px / 600 / -1.8px letter-spacing
              </Text>
              <Heading level={3}>
                The Quick Brown Fox Jumps Over the Lazy Dog
              </Heading>
            </div>

            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Heading 4 — 24px / 31.2px / 600 / -0.48px letter-spacing
              </Text>
              <Heading level={4}>
                The Quick Brown Fox Jumps Over the Lazy Dog
              </Heading>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section className="mb-[var(--spacing-16x)]">
          <Heading level={2} className="mb-[var(--spacing-6x)]">
            Body Text Variants
          </Heading>

          <div className="space-y-[var(--spacing-6x)]">
            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Paragraph Regular — 20px / 30px / 500
              </Text>
              <Text variant="regular">
                The quick brown fox jumps over the lazy dog. This is the default body text style,
                used for most content throughout the portfolio. It uses General Sans at weight 500
                with a comfortable line height for extended reading.
              </Text>
            </div>

            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Paragraph Bold — 20px / 30px / 600
              </Text>
              <Text variant="bold">
                The quick brown fox jumps over the lazy dog. This is the bold variant of body text,
                used for emphasis and important callouts. It maintains the same size and line height
                but uses weight 600 for increased visual weight.
              </Text>
            </div>

            <div>
              <Text variant="small" className="mb-[var(--spacing-2x)] text-muted">
                Paragraph Small — 16px / 24px / 500
              </Text>
              <Text variant="small">
                The quick brown fox jumps over the lazy dog. This is the small text variant,
                ideal for captions, metadata, timestamps, and secondary information that
                supports the main content without competing for attention.
              </Text>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-[var(--spacing-16x)]">
          <Heading level={2} className="mb-[var(--spacing-6x)]">
            Real-World Example
          </Heading>

          <article className="space-y-[var(--spacing-6x)]">
            <div>
              <Text variant="small" className="text-muted mb-[var(--spacing-2x)]">
                Case Study
              </Text>
              <Heading level={3} className="mb-[var(--spacing-3x)]">
                Samsung Ad Manager
              </Heading>
              <Text variant="small" className="text-muted mb-[var(--spacing-4x)]">
                2023-2024 · Principal Product Designer
              </Text>
              <Text variant="regular" className="mb-[var(--spacing-4x)]">
                Transforming enterprise advertising into a self-service platform.
                Led the design of Samsung's self-service advertising platform,
                opening a multi-billion dollar mid-market opportunity.
              </Text>
              <Text variant="bold">
                87% reduction in creative asset requirements
              </Text>
            </div>
          </article>
        </section>

        {/* Design System Info */}
        <section>
          <Heading level={2} className="mb-[var(--spacing-6x)]">
            Design System Status
          </Heading>
          <div className="space-y-[var(--spacing-4x)]">
            <div className="flex items-baseline gap-[var(--spacing-3x)]">
              <Text variant="bold" as="span">Typography:</Text>
              <Text variant="regular" as="span">General Sans (Variable Font)</Text>
            </div>
            <div className="flex items-baseline gap-[var(--spacing-3x)]">
              <Text variant="bold" as="span">Colors:</Text>
              <Text variant="regular" as="span">12-step neutral scale</Text>
            </div>
            <div className="flex items-baseline gap-[var(--spacing-3x)]">
              <Text variant="bold" as="span">Spacing Grid:</Text>
              <Text variant="regular" as="span">4px increments (0x → 40x)</Text>
            </div>
            <div className="flex items-baseline gap-[var(--spacing-3x)]">
              <Text variant="bold" as="span">Theme Support:</Text>
              <Text variant="regular" as="span">Light/Dark (automatic via prefers-color-scheme)</Text>
            </div>
            <div className="flex items-baseline gap-[var(--spacing-3x)]">
              <Text variant="bold" as="span">Source:</Text>
              <Text variant="regular" as="span">Figma Design Tokens</Text>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
