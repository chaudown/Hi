# Portfolio Project Documentation

## Project Overview

This is a **flagship product design portfolio** for Brandon, a Principal Product Designer. This is not a blog or generic portfolio template—it's a craft-focused showcase that must feel like it was built by an expert front-end engineer.

**Quality bar:** Production-ready, performant, accessible, and pixel-perfect to Figma designs. Every detail matters.

**Core pages:**
- Home (case study discovery)
- ~10 detailed case study pages
- About
- Contact
- Supporting pages (process, experiments, writing - TBD)

---

## Design Source of Truth

### Figma File Structure

- **Single Figma file** with multiple pages
- **"Production" page** contains all finalized designs ready for implementation
- All other pages are drafts/explorations—**ignore them**
- Frames on Production page use naming convention: `page/home`, `page/case-study-samsung`, `page/about`, etc.
- Shared component library is defined on the Production page

### Design System

**All sizing uses 4px increments:**
- Figma tokens are named: `0x`, `1x`, `2x`, `3x`, etc.
- Maps to: `0px`, `4px`, `8px`, `12px`, etc.
- Extract these from Figma and map to Tailwind spacing scale

**Design token categories:**
- **Spacing:** `0x` through `Nx` (4px increments)
- **Colors:** Variables with light/dark mode variants
- **Typography:** Font families, sizes, weights, line heights (all on 4px grid)
- **Borders:** Radii, widths
- **Shadows:** Elevation system
- **Breakpoints:** Desktop, tablet, mobile

**Component structure in Figma:**
- Uses Auto Layout extensively
- Components have variants for different states
- Semantic naming (buttons, cards, nav, sections, etc.)
- Text layers map to typography tokens
- Interactive states defined (hover, active, disabled)

---

## Tech Stack

### Framework & Language
- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **React 18+** (stable, not using React Compiler)

### Styling
- **Tailwind CSS** for all styling
  - Rationale: Best for design token mapping, performance, utility-first approach matches component-based design
  - Custom theme config maps directly to Figma tokens
  - No arbitrary values—use tokens only

### Animation
- **Framer Motion** as primary animation library
  - Rationale: Native React integration, excellent for page transitions and scroll-triggered reveals
  - Use for: page transitions, section reveals, microinteractions, modal animations
- **GSAP** (optional, only if needed for complex timeline-based animations)
  - Add only when Framer Motion limitations are reached

### Content Management
- **MDX** for case study content
- Frontmatter for metadata (title, description, tags, etc.)
- Content lives in `/content/case-studies/` directory
- Figma defines UI component designs; MDX provides the actual content

### Media Handling
- **Next.js Image** component for all images
- **Formats:** AVIF (primary) → WebP → JPG (fallback)
- **Video:** Optimized MP4 hosted on Vercel (2min max, ≤4K resolution)
  - Poster images for all videos
  - Lazy loading below fold
  - Future: Migrate to Cloudflare Stream if traffic scales

### Icons
- **Font Awesome** (specify which variant: Pro Solid, etc)
- Used in buttons, links

### Testing & Verification
- **Playwright** for visual verification and screenshots
- **Lighthouse CI** for performance monitoring
- **ESLint + Prettier** for code quality

### Analytics
- **Vercel Analytics** (free tier)
- **Custom event tracking** for:
  - Scroll depth (25%, 50%, 75%, 100%)
  - Section exposure (viewport intersection)
  - Media engagement (modal opens, video play/pause/complete, carousel interactions)
  - Navigation clicks (case study cards, next/prev, external links)
  - Session flow (multi-case-study sessions)

### Hosting & Deployment
- **Vercel** (Hobby or Pro plan)
- Edge-optimized with CDN
- Preview deployments on every git push
- Environment variables for analytics keys, etc.

---

## Figma MCP Integration

### Setup Requirements
- Figma MCP server must be configured and authenticated
- Access to Figma file with proper permissions
- Dev Mode access (paid Figma plan)

### Token Extraction Workflow

**Auto-extract design tokens on every sync:**
1. Connect to Figma Production page via MCP
2. Extract all design tokens (colors, spacing, typography, shadows, radii)
3. Generate `tailwind.config.ts` theme extension
4. Generate TypeScript types for tokens (e.g., `SpacingToken`, `ColorToken`)
5. **Confirm updates:** After extraction, report what tokens were added/changed/removed

**Token mapping:**
- Figma `0x` → Tailwind `spacing['0x']` → `0px`
- Figma `1x` → Tailwind `spacing['1x']` → `4px`
- Figma color variables → Tailwind colors with light/dark mode CSS variables
- Typography tokens → Tailwind `fontSize`, `lineHeight`, `fontWeight` extensions

### Component Extraction

**Automatic component mapping:**
- Read component structure from Figma Production page
- Map Figma component names to React component names (PascalCase)
- Extract:
  - Layout properties (flex direction, gap, padding, alignment)
  - Dimensions (width, height, max-width)
  - Typography (font family, size, weight, line height, color)
  - Spacing (margin, padding using token names)
  - Borders (radius, width, color)
  - Shadows
  - Interactive states (hover, active, disabled)

**Example mapping:**
- Figma component: `Button/Primary` → React: `<Button variant="primary">`
- Figma component: `Content Section/Standard Width` → React: `<ContentSection width="standard">`

### Verification Process

After implementing components from Figma:
1. Use Playwright to capture screenshots at key breakpoints
2. Compare spacing/sizing against Figma Dev Mode measurements
3. Report any discrepancies > 2px
4. When in doubt about design intent, ask for clarification before proceeding

---

## Project Structure
```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout (theme provider, fonts, analytics)
│   ├── page.tsx                 # Home page
│   ├── [slug]/                  # Dynamic case study routes
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── atoms/                   # Atomic components
│   │   ├── Button.tsx
│   │   ├── Icon.tsx
│   │   ├── Image.tsx
│   │   ├── Video.tsx
│   │   └── ...
│   ├── molecules/               # Composed components
│   │   ├── CaseStudyCard.tsx
│   │   ├── MediaCarousel.tsx
│   │   ├── MediaModal.tsx
│   │   └── ...
│   ├── organisms/               # Complex sections
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── CaseStudyHero.tsx
│   │   └── ...
│   ├── layouts/                 # Layout components
│   │   ├── ContentSection.tsx  # Standard vs Wide width containers
│   │   ├── MediaGrid.tsx
│   │   └── ...
│   └── providers/               # Context providers
│       ├── ThemeProvider.tsx
│       └── AnalyticsProvider.tsx
├── content/
│   └── case-studies/            # MDX files
│       ├── samsung-ad-manager.mdx
│       ├── creative-intelligence.mdx
│       └── ...
├── lib/
│   ├── mdx.ts                   # MDX processing utilities
│   ├── analytics.ts             # Analytics event tracking
│   ├── figma-tokens.ts          # Generated Figma token types
│   └── utils.ts                 # Shared utilities
├── public/
│   ├── images/
│   │   └── case-studies/
│   │       ├── samsung/
│   │       └── ...
│   ├── videos/
│   └── fonts/
├── styles/
│   └── globals.css              # Tailwind imports, CSS variables
├── tests/
│   └── visual/                  # Playwright tests
├── tailwind.config.ts           # Extended with Figma tokens
├── next.config.js
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── CLAUDE.md                    # This file
```

---

## Component Architecture

### Atomic Design Principles

**Three levels of components:**

1. **Atoms** (`components/atoms/`)
   - Button, Icon, Image, Video, Heading, BodyText
   - Map 1:1 to Figma atomic components
   - Highly reusable, no layout opinions
   - Accept all styling via props (variant, size, etc.)

2. **Molecules & Organisms** (`components/molecules/`, `components/organisms/`)
   - CaseStudyCard, MediaCarousel, MediaModal, Navigation, Footer
   - Composed from atoms
   - Implement specific layout patterns from Figma

3. **Layouts** (`components/layouts/`)
   - ContentSection (standard vs wide width)
   - MediaGrid (columns, gap)
   - Page templates

### Component Guidelines

**General principles:**
- **Composable:** Components should nest cleanly
- **Typed:** Full TypeScript, no `any` types
- **Accessible:** Proper ARIA, keyboard nav, focus management
- **Performant:** Lazy load heavy components, memoize when appropriate
- **Testable:** Props-driven, easy to test in isolation

**Naming conventions:**
- PascalCase for component files and exports
- Props interfaces: `ButtonProps`, `ContentSectionProps`
- Variants use string literal types: `variant: 'primary' | 'secondary'`

**File structure per component:**
```tsx
// Button.tsx
import { forwardRef } from 'react';
import { Icon } from './Icon';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  icon?: string; // Font Awesome icon name
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // Allow additional Tailwind classes
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', icon, iconPosition = 'right', children, ...props }, ref) => {
    // Implementation
  }
);

Button.displayName = 'Button';
```

### Layout Components

**ContentSection:**
- `width: 'standard' | 'wide'`
- Standard: max-width ~900px, side padding
- Wide: max-width ~1400px, side padding
- Responsive: adjusts max-width and padding per breakpoint

**MediaGrid:**
- `columns: 1 | 2 | 3 | 4`
- Responsive grid with gap from design tokens
- All children: Images or Videos with consistent aspect ratio handling

**MediaCarousel:**
- Horizontal scroll with snap points
- No visible nav arrows/dots (clean, minimal)
- Touch/mouse swipe enabled
- Snaps to nearest slide
- Mobile-friendly

---

## MDX Content Structure

### Case Study Frontmatter
```mdx
---
title: "Samsung Ad Manager"
subtitle: "Transforming enterprise advertising into a self-service platform"
slug: "samsung-ad-manager"
thumbnail: "/images/case-studies/samsung/thumbnail.jpg"
year: "2023-2024"
role: "Principal Product Designer"
team: ["Brandon (Lead)", "2 Designers", "PM", "Eng Team"]
tags: ["B2B SaaS", "Design System", "0-to-1"]
featured: true
order: 1
seo:
  description: "How I led the design of Samsung's self-service advertising platform, opening a multi-billion dollar mid-market opportunity."
  ogImage: "/images/case-studies/samsung/og-image.jpg"
---
```

### Case Study Content Structure
```mdx
<CaseStudyHero
  title={frontmatter.title}
  subtitle={frontmatter.subtitle}
  media="/videos/samsung-hero.mp4"
  poster="/images/samsung-hero-poster.jpg"
/>

<ContentSection width="standard">

## The Challenge

Body copy here, using standard Markdown syntax...

</ContentSection>

<ContentSection width="wide">

<MediaGrid columns={2}>
  <Image src="/images/samsung-before.jpg" alt="Before state" expandable />
  <Image src="/images/samsung-after.jpg" alt="After state" expandable />
</MediaGrid>

</ContentSection>

<MediaCarousel>
  <Image src="/images/samsung-1.jpg" alt="Design system components" expandable />
  <Image src="/images/samsung-2.jpg" alt="Billing interface" expandable />
  <Video src="/videos/samsung-demo.mp4" poster="/images/samsung-demo-poster.jpg" expandable />
</MediaCarousel>

<ContentSection width="standard">

## Impact

- 87% reduction in creative asset requirements
- Opened multi-billion dollar mid-market opportunity
- Design system adopted across 3 product lines

</ContentSection>

<NextCaseStudy
  title="Creative Intelligence"
  slug="creative-intelligence"
  thumbnail="/images/case-studies/creative-intelligence/thumbnail.jpg"
/>
```

### Custom MDX Components

**Available components in MDX:**
- `<CaseStudyHero>` - Hero section with title, subtitle, media
- `<ContentSection>` - Width-constrained content blocks
- `<MediaGrid>` - Grid layout for images/videos
- `<MediaCarousel>` - Horizontal scrolling media
- `<Image>` - Enhanced Next.js Image with modal support
- `<Video>` - Video player with poster, lazy loading
- `<Button>` - Call-to-action buttons
- `<Icon>` - Font Awesome icons
- `<NextCaseStudy>` - Footer navigation to next case study

**Icons in MDX:**
```mdx
<Button icon="arrow-right" variant="primary">
  View prototype
</Button>

Check out the [live product <Icon name="external-link" />](https://example.com)
```

---

## Styling Conventions

### Tailwind Configuration

**Extend default theme with Figma tokens:**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      spacing: {
        '0x': '0px',
        '1x': '4px',
        '2x': '8px',
        '3x': '12px',
        '4x': '16px',
        '5x': '20px',
        '6x': '24px',
        '8x': '32px',
        '10x': '40px',
        '12x': '48px',
        '16x': '64px',
        '20x': '80px',
        '24x': '96px',
        // Add all spacing tokens from Figma
      },
      colors: {
        // Map Figma color variables
        // Use CSS variables for light/dark mode support
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          // ...
        },
        // ...all colors from Figma
      },
      fontSize: {
        // Map Figma typography tokens
        'display-1': ['var(--font-size-display-1)', { lineHeight: 'var(--line-height-display-1)' }],
        // ...
      },
      borderRadius: {
        // Map Figma radius tokens
      },
      boxShadow: {
        // Map Figma shadow tokens
      },
    },
  },
  plugins: [],
};

export default config;
```

### CSS Variables for Theme
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode colors */
    --color-primary: #...;
    --color-primary-hover: #...;
    /* ...all color tokens */
    
    /* Typography */
    --font-size-display-1: 4rem;
    --line-height-display-1: 1.2;
    /* ...all typography tokens */
  }
  
  .dark {
    /* Dark mode colors */
    --color-primary: #...;
    --color-primary-hover: #...;
    /* ...all color tokens in dark variants */
  }
}
```

### Component Styling Rules

1. **Use design tokens exclusively**
   - ❌ `className="p-4"` (arbitrary value)
   - ✅ `className="p-4x"` (maps to 16px from Figma)

2. **No arbitrary values**
   - ❌ `className="text-[18px]"`
   - ✅ `className="text-body-large"` (token from Figma)

3. **Composition over duplication**
   - Extract repeated patterns into components
   - Use Tailwind's `@apply` sparingly (prefer components)

4. **Responsive design**
   - Mobile-first approach
   - Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
   - Match Figma breakpoints exactly

### Import Aliases

Use path aliases defined in `tsconfig.json`:
```tsx
// ✅ Use semantic aliases
import { Button } from '@/components/atoms/Button';
import { trackScrollDepth } from '@/lib/analytics';
import type { CaseStudy } from '@/types';

// ❌ Avoid relative paths
import { Button } from '../../../components/atoms/Button';
```

**Configured aliases:**
- `@/components/*` - All components (atoms, molecules, organisms, layouts)
- `@/lib/*` - Utilities, helpers, shared logic
- `@/styles/*` - Global styles, CSS files
- `@/content/*` - MDX case study files
- `@/app/*` - Next.js app directory (routes, layouts)
- `@/public/*` - Public assets (images, videos, fonts)

---

## Animation & Transitions

### Framer Motion Guidelines

**Page transitions:**
```tsx
// app/layout.tsx
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Scroll-triggered reveals:**
```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ContentSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
```

**Animation principles:**
- **Subtle:** Small movement distances (20-40px max)
- **Fast:** Duration 0.25-0.5s for most animations
- **Natural easing:** Use `ease: [0.22, 1, 0.36, 1]` (ease-out-cubic) or `ease: 'easeInOut'`
- **Purpose-driven:** Support the story, don't distract
- **Accessible:** Respect `prefers-reduced-motion`

### Reduced Motion Support

**Always implement:**
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
>
```

Or use Framer Motion's built-in support:
```tsx
import { MotionConfig } from 'framer-motion';

<MotionConfig reducedMotion="user">
  {/* All animations inside respect user preference */}
</MotionConfig>
```

### Microinteractions

**Button hover/active states:**
- Scale: 1.0 → 1.02 on hover
- Brightness: subtle increase
- Duration: 0.2s
- No scale on mobile (touch devices)

**Card hover:**
- Lift: subtle shadow increase + y: -4px
- Duration: 0.3s

**Modal animations:**
- Backdrop: opacity 0 → 0.8 (0.25s)
- Content: scale 0.95 + opacity 0 → scale 1 + opacity 1 (0.3s, ease-out)
- Exit: reverse

---

## Media Handling

### Image Optimization

**Next.js Image component usage:**
```tsx
import Image from 'next/image';

<Image
  src="/images/case-studies/samsung/hero.jpg"
  alt="Samsung Ad Manager dashboard"
  width={1920} // dimensions contingent on what's presented in Figma
  height={1080} // dimensions contingent on what's presented in Figma
  quality={90}
  priority={false} // Only true for above-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Generate with plaiceholder or similar
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
/>
```

**Image formats:**
- Primary: AVIF (best compression)
- Fallback: WebP
- Final fallback: JPG
- Next.js handles format negotiation automatically

**Responsive sizing:**
- Generate multiple sizes: 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w
- Use `sizes` attribute for proper source selection
- **Mobile cap:** 2x device pixel ratio (e.g., 750px for 375px viewport)
- **Desktop:** Full quality up to 2048px wide

**Lazy loading:**
- All images below fold: `loading="lazy"` (Next.js Image default)
- Hero images: `priority={true}`
- Use `placeholder="blur"` for better perceived performance

### Video Optimization

**Video component structure:**
```tsx
<video
  src="/videos/samsung-demo.mp4"
  poster="/images/samsung-demo-poster.jpg"
  controls
  preload="metadata" // or "none" for below-fold videos
  playsInline
  muted={autoplay}
  loop={autoplay}
/>
```

**Video specifications:**
- Max duration: 2 minutes // generally with some potential exceptions
- Max resolution: 4K (3840x2160), but 1080p preferred for file size
- Format: H.264 MP4 (best browser compatibility)
- Aggressive compression (target: <10MB for 30s clip)
- Always include poster image (optimized JPG/WebP)

**Hero video (autoplay):**
- Muted, loop, playsinline
- Only on desktop with good connection (use `navigator.connection` API)
- Poster image loads first
- Video lazy loads after initial page render

**Modal video:**
- Click-to-play behavior
- Poster image with play button overlay
- Load video only when modal opens
- Track play/pause/complete events for analytics

**Future consideration:**
- Migrate to Cloudflare Stream ($1/1000 min viewed) if traffic scales
- Keep MP4 hosting on Vercel for now (free)

---

## Modal System

### Image/Video Expandable Modal

**Behavior:**
- Click any image/video with `expandable` prop to open modal
- Full-screen modal with semi-transparent backdrop
- Backdrop color: semi-transparent black (dark mode) or white (light mode)
- Close on outside click or close button (X)
- Prev/Next arrows to navigate through all expandable media in sequence
- Keyboard nav: Esc to close, Left/Right arrows to navigate
- Body scroll lock when modal open

**Implementation:**
```tsx
import { Dialog } from '@headlessui/react'; // or similar
import { AnimatePresence, motion } from 'framer-motion';

export function MediaModal({ isOpen, onClose, media, currentIndex, onNavigate }) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static as={motion.div} open={isOpen} onClose={onClose}>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 dark:bg-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4x"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button onClick={onClose} aria-label="Close">
              <Icon name="xmark" />
            </button>
            
            {/* Prev/Next buttons */}
            <button onClick={() => onNavigate('prev')} aria-label="Previous">
              <Icon name="chevron-left" />
            </button>
            
            {/* Media content */}
            {media[currentIndex].type === 'image' ? (
              <Image src={media[currentIndex].src} alt={media[currentIndex].alt} />
            ) : (
              <video src={media[currentIndex].src} controls autoPlay />
            )}
            
            <button onClick={() => onNavigate('next')} aria-label="Next">
              <Icon name="chevron-right" />
            </button>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
```

**Analytics tracking:**
- Track modal open with media identifier
- Track prev/next navigation
- Track video play/pause/complete in modal
- Track time spent in modal

---

## Navigation & Layout

### Fixed Header Navigation

**Structure:**
```
[Logo/Name]                                        [=]
```

**Behavior:**
- Fixed position at top
- Background: backdrop blur with semi-transparent background
- Hamburger menu opens nav menu to all home, case studies, and contact details
- Active state for current page
- Smooth scroll to top when logo clicked

**Implementation notes:**
- Use `position: fixed` with `top: 0`
- Z-index high enough to overlay content
- Add top padding to `<body>` equal to header height
- Backdrop blur: `backdrop-blur-md bg-white/80 dark:bg-black/80`

### Theme Switching

**User preference:**
- Default: Match OS preference (`prefers-color-scheme`)
- Allow manual toggle (sun/moon icon in hamgurger menu) as well as shortcut keys to toggle from light to dark (Cmd/Ctrl + .)
- Persist choice in localStorage
- Apply `dark` class to `<html>` element

**Implementation:**
```tsx
// app/providers/ThemeProvider.tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```


---

## Performance Optimization

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimization Strategies

**1. Static Generation (SSG)**
- Pre-render all case study pages at build time
- Home, About, Contact also static
- Fast CDN delivery via Vercel Edge Network

**2. Code Splitting**
- Lazy load components below fold
- Dynamic imports for heavy components (modals, carousels)
```tsx
import dynamic from 'next/dynamic';
const MediaModal = dynamic(() => import('./MediaModal'), { ssr: false });
```

**3. Font Optimization**
- Use `next/font` for automatic font optimization
- Preload critical fonts
- Use `font-display: swap` to avoid FOIT
```tsx
import { Inter, Playfair_Display } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

**4. Image Optimization**
- Already covered in Media Handling section
- Use blur placeholders
- Proper `sizes` attribute
- Lazy load below fold

**5. Minimize JavaScript**
- Avoid unnecessary client components
- Use React Server Components where possible
- Tree-shake unused code
- Minimize third-party scripts

**6. Preload Critical Assets**
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Lighthouse CI Integration

**Setup:**
- Run Lighthouse on every build (CI/CD)
- Fail build if scores drop below thresholds:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+

**Configuration:**
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:3000", "http://localhost:3000/case-study-samsung"]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

---

## Accessibility

### Semantic HTML

**Always use:**
- `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Proper heading hierarchy: `<h1>` (one per page) → `<h2>` → `<h3>`
- `<button>` for buttons, `<a>` for links
- `<ul>`/`<ol>` for lists
- `<figure>` and `<figcaption>` for images with captions

### Keyboard Navigation

**All interactive elements must be keyboard accessible:**
- Tab order follows visual order
- Focus states are clearly visible (outline or custom focus ring)
- No keyboard traps (modals can be closed with Esc)
- Skip to main content link for screen readers

**Focus management:**
```tsx
// When modal opens, focus close button
useEffect(() => {
  if (isOpen) {
    closeButtonRef.current?.focus();
  }
}, [isOpen]);
```

### ARIA Attributes

**Use when needed:**
- `aria-label` for icon-only buttons
- `aria-labelledby` / `aria-describedby` for complex components
- `aria-expanded` for toggles
- `aria-current="page"` for active nav links
- `aria-live` for dynamic content updates

**Example:**
```tsx
<button aria-label="Open menu" aria-expanded={isOpen}>
  <Icon name="bars" />
</button>
```

### Alt Text

**All images must have descriptive alt text:**
- Describe what's in the image, not "image of..."
- Keep concise but informative
- Decorative images: `alt=""` (empty string)

**Example:**
```tsx
<Image
  src="/images/samsung-dashboard.jpg"
  alt="Samsung Ad Manager dashboard showing campaign performance metrics and charts"
/>
```

### Color Contrast

**WCAG AA compliance:**
- Text contrast ratio: 4.5:1 (normal text), 3:1 (large text)
- Interactive element contrast: 3:1
- Test with tools: Lighthouse, axe DevTools

### Motion Preferences

**Respect `prefers-reduced-motion`:**
- Disable/reduce animations when user has motion sensitivity
- Already covered in Animation section
- Test by enabling in OS settings

---

## SEO Optimization

### Metadata

**Page-level metadata:**
```tsx
// app/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);
  
  return {
    title: `${caseStudy.title} | Brandon - Product Designer`,
    description: caseStudy.seo.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.seo.description,
      images: [{ url: caseStudy.seo.ogImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.seo.description,
      images: [caseStudy.seo.ogImage],
    },
  };
}
```

### Structured Data

**Add JSON-LD for portfolio items:**
```tsx
// components/StructuredData.tsx
export function CaseStudyStructuredData({ caseStudy }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.title,
    description: caseStudy.seo.description,
    author: {
      '@type': 'Person',
      name: 'Brandon',
      jobTitle: 'Product Designer',
    },
    datePublished: caseStudy.year,
    image: caseStudy.thumbnail,
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### Sitemap & Robots

**Generate dynamically:**
```tsx
// app/sitemap.ts
export default async function sitemap() {
  const caseStudies = await getAllCaseStudies();
  
  return [
    { url: 'https://bchau.com', priority: 1.0 },
    { url: 'https://bchau.com/about', priority: 0.8 }, 
    ...caseStudies.map(cs => ({
      url: `https://bchau.com/${cs.slug}`,
      lastModified: cs.updatedAt,
      priority: 0.9,
    })),
  ];
}
```

### Performance = SEO

- Fast load times improve search ranking
- Core Web Vitals are ranking factors
- Mobile-friendliness is critical
- All optimization work serves SEO

---

## Analytics Implementation

### Vercel Analytics Setup
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Custom Event Tracking

**Event types to track:**

1. **Scroll depth:**
```tsx
// lib/analytics.ts
import { track } from '@vercel/analytics';

export function trackScrollDepth(depth: number) {
  track('scroll_depth', { depth, page: window.location.pathname });
}

// Use in components with Intersection Observer
```

2. **Section exposure:**
```tsx
export function trackSectionView(sectionName: string) {
  track('section_view', { section: sectionName, page: window.location.pathname });
}
```

3. **Media engagement:**
```tsx
export function trackMediaOpen(mediaType: 'image' | 'video', mediaId: string) {
  track('media_open', { type: mediaType, id: mediaId });
}

export function trackVideoProgress(videoId: string, percentWatched: number) {
  track('video_progress', { id: videoId, percent: percentWatched });
}
```

4. **Navigation clicks:**
```tsx
export function trackCaseStudyClick(slug: string, position: number) {
  track('case_study_click', { slug, position });
}
```

**Implementation in components:**
```tsx
// components/Image.tsx
import { trackMediaOpen } from '@/lib/analytics';

export function Image({ src, alt, expandable }) {
  const handleClick = () => {
    if (expandable) {
      trackMediaOpen('image', src);
      // Open modal
    }
  };
  
  return <NextImage src={src} alt={alt} onClick={expandable ? handleClick : undefined} />;
}
```

### Video Play Tracking
```tsx
// components/Video.tsx
import { useRef, useEffect } from 'react';
import { trackVideoProgress } from '@/lib/analytics';

export function Video({ src, ...props }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      const percent = (video.currentTime / video.duration) * 100;
      if (percent >= 25 && !milestones.has(25)) {
        trackVideoProgress(src, 25);
        milestones.add(25);
      }
      // Similar for 50%, 75%, 100%
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [src]);
  
  return <video ref={videoRef} src={src} {...props} />;
}
```

---

## Testing & Verification

### Playwright Visual Testing

**Setup:**
```typescript
// tests/visual/case-studies.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Samsung Case Study', () => {
  test('matches Figma design at desktop', async ({ page }) => {
    await page.goto('/samsung-ad-manager');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('samsung-desktop.png', {
      fullPage: true,
    });
  });
  
  test('matches Figma design at mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/samsung-ad-manager');
    
    await expect(page).toHaveScreenshot('samsung-mobile.png', {
      fullPage: true,
    });
  });
  
  test('modal opens and closes correctly', async ({ page }) => {
    await page.goto('/samsung-ad-manager');
    
    // Click first expandable image
    await page.click('[data-expandable="true"]');
    
    // Modal should be visible
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Close modal
    await page.click('[aria-label="Close"]');
    
    // Modal should be hidden
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
```

**Run tests:**
```bash
npx playwright test
npx playwright test --ui  # Interactive mode
npx playwright show-report  # View results
```

### Component Verification Workflow

**After implementing a component from Figma:**
1. Run Playwright to capture screenshots at key breakpoints
2. Use Figma Dev Mode to measure spacing, dimensions
3. Compare screenshot measurements to Figma spec
4. Report any discrepancies > 2px
5. Fix discrepancies and re-test

**Measurement helper:**
```typescript
// tests/helpers/measure.ts
export async function measureElement(page, selector: string) {
  const box = await page.locator(selector).boundingBox();
  const styles = await page.locator(selector).evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      padding: computed.padding,
      margin: computed.margin,
      fontSize: computed.fontSize,
      lineHeight: computed.lineHeight,
    };
  });
  
  return { box, styles };
}
```

---

## Coding Conventions

### TypeScript

**Strict mode enabled:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Type everything:**
- No `any` types (use `unknown` if truly dynamic)
- Props interfaces for all components
- Return types for functions
- Utility types: `Partial`, `Pick`, `Omit`, `Required`

### Code Organization

**Imports order:**
1. External packages (React, Next, etc.)
2. Internal components
3. Utilities/lib
4. Types
5. Styles

**Example:**
```tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@/components/atoms/Button';
import { ContentSection } from '@/components/layouts/ContentSection';

import { trackSectionView } from '@/lib/analytics';

import type { CaseStudy } from '@/types';

import styles from './CaseStudyPage.module.css'; // if using CSS modules
```

### Component Patterns

**Prefer composition:**
```tsx
// ❌ Avoid prop drilling
<Card title="..." description="..." image="..." />

// ✅ Use composition
<Card>
  <CardImage src="..." />
  <CardTitle>...</CardTitle>
  <CardDescription>...</CardDescription>
</Card>
```

**Use forwardRef for components wrapping native elements:**
```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);
```

### Comments

**Comment when:**
- Logic is non-obvious
- Explaining Figma design decisions
- Workarounds for browser bugs
- Complex calculations

**Don't comment:**
- Obvious code
- What code does (code should be self-explanatory)
- Instead of refactoring unclear code

### Error Handling

**Graceful degradation:**
```tsx
// If image fails to load, show placeholder
<Image
  src={src}
  alt={alt}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder.jpg';
  }}
/>
```

**Error boundaries for sections:**
```tsx
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
```

---

## Working with Claude (You!)

### When to Ask for Clarification

**Always ask when:**
- Figma design intent is ambiguous (spacing, alignment, behavior)
- Component naming is unclear
- Animation details not specified
- Breakpoint behavior not shown in Figma
- Interactions not documented

**How to ask:**
- Be specific about what's unclear
- Reference Figma frame/component names
- Offer 2-3 options if you have ideas
- Wait for confirmation before proceeding

### Communication Style

**In code comments:**
```tsx
// TODO: Confirm animation duration with Brandon
// The Figma design shows a fade-in, but duration isn't specified.
// Using 0.3s for now - adjust if needed.
```

**In commit messages:**
- Clear, descriptive messages
- Reference Figma frame if relevant
- Note any assumptions made

**In pull requests / updates:**
- Summarize what was built
- Call out any deviations from Figma (and why)
- Ask for review on uncertain decisions

### Incremental Changes

**Prefer:**
- Small, focused changes
- One component or feature at a time
- Safe refactors with clear explanations

**Avoid:**
- Large, risky refactors without discussion
- Changing multiple components at once
- Breaking changes without migration plan

### Figma Sync Confirmations

**After extracting tokens from Figma:**
```
✅ Synced design tokens from Figma Production page

Added:
- spacing-32x (128px)
- color-accent-dark (#...)

Changed:
- spacing-24x: 92px → 96px
- color-primary: #... → #...

Removed:
- (none)

Updated tailwind.config.ts and globals.css
```

---

## Environment Setup

### Required Tools

- **Node.js:** v18 or later
- **npm or pnpm:** Package manager
- **Figma account:** Paid plan with Dev Mode access
- **Figma MCP server:** Configured and authenticated
- **Playwright:** For visual testing
- **Git:** Version control

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://bchau.com
FIGMA_ACCESS_TOKEN=figd_...
FIGMA_FILE_KEY=...
VERCEL_ANALYTICS_ID=...  # If not auto-configured by Vercel
```

### Scripts
```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "lighthouse": "lhci autorun",
    "sync-figma": "node scripts/sync-figma-tokens.js"
  }
}
```

---

## Project Goals Recap

**This portfolio must:**
1. ✅ Feel expertly engineered (fast, polished, professional)
2. ✅ Be pixel-perfect to Figma designs
3. ✅ Load quickly and perform well (especially media)
4. ✅ Use tasteful, purpose-driven animations
5. ✅ Be fully accessible (WCAG AA minimum)
6. ✅ Provide detailed analytics on engagement
7. ✅ Be maintainable and well-structured
8. ✅ Showcase Brandon's work as a Principal Product Designer with deep expertise in Ad Tech and proven experience as a dual Design and Product leader

**Quality bar:**
- Production-ready code, not prototypes
- Clarity and maintainability over cleverness
- When in doubt, ask for clarification
- Align implementation with Figma design always

---

## Quick Reference

### File Extensions
- `.tsx` for React components
- `.ts` for utilities, types, lib functions
- `.mdx` for content
- `.css` for global styles (Tailwind imports, CSS variables)

### Naming Conventions
- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Types: PascalCase with `Type` or `Props` suffix (`ButtonProps`)
- CSS classes: Tailwind utilities only (no custom class names needed)

### Common Commands
```bash
npm run dev                    # Start dev server
npm run build                  # Production build
npm run lint                   # Lint code
npm run type-check             # TypeScript check
npm run test                   # Run Playwright tests
npm run sync-figma             # Pull latest design tokens
```

### Key URLs
- Figma file: [Add URL when available]
- Staging: [Vercel preview URL]
- Production: https://bchau.com

---

## Version History

- **v1.0** - Initial project setup and documentation
- Updates will be tracked in git commits

---

**End of CLAUDE.md**

This document is the source of truth for building Brandon's portfolio. Follow these guidelines closely, ask for clarification when needed, and prioritize quality and alignment with Figma designs above all else.