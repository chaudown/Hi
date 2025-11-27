# Figma Design System Extraction
**File:** bchau_2025 (v1DvPBGEnp7sS9ClFCPqoi)
**Extracted:** 2025-11-19

---

## ⚠️ Important Findings

**API Token Scope Limitation:**
Your current Figma API token does not have the `file_variables:read` scope, which means I cannot directly access Figma Variables. To get full access to your design tokens (especially if you're using Figma Variables for colors, spacing, etc.), you'll need to regenerate your token with the following scopes:
- `file_variables:read`
- `file_variables:write` (optional, if you want to modify)

**Current Extraction Method:**
I've extracted design tokens by analyzing:
- Text styles (from style definitions)
- Fill/color styles (from style definitions)
- Spacing patterns (by analyzing layout properties)
- Component structure (from component sets)

---

## Typography Tokens

### Headings

| Token Name | Font Family | Size | Weight | Line Height |
|------------|-------------|------|--------|-------------|
| `heading-1` | General Sans | 60px | 600 | 63px |
| `heading-2` | General Sans | 48px | 600 | 55.2px |
| `heading-3` | General Sans | 36px | 600 | 41.4px |
| `heading-4` | General Sans | 24px | 600 | 31.2px |

### Body Text

| Token Name | Font Family | Size | Weight | Line Height |
|------------|-------------|------|--------|-------------|
| `paragraph-regular` | General Sans | 20px | 500 | 30px |
| `paragraph-bold` | General Sans | 20px | 600 | 30px |
| `paragraph-small` | General Sans | 16px | 500 | 24px |
| `paragraph-button` | General Sans | 16px | 600 | 16px |

### Icon Fonts

| Token Name | Font Family | Size | Weight | Line Height |
|------------|-------------|------|--------|-------------|
| `icon-button` | Font Awesome 6 Pro | 16px | 900 | 16px |
| `icon-paragraph` | Font Awesome 6 Pro | 20px | 900 | 30px |

**Font Awesome variant:** Pro (Solid weight 900)

---

## Color Tokens

### Defined Colors

| Token Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| `Colors/Yellow` | `#ffcc00` | rgb(255, 204, 0) | Accent/highlight |
| `Colors/Green` | `#34c759` | rgb(52, 199, 89) | Success states |
| `Colors/Red` | `#ff3b30` | rgb(255, 59, 48) | Error states |

### ⚠️ Missing Color Definitions

Based on CLAUDE.md requirements, you'll also need:
- Primary colors (brand colors)
- Text colors (body, muted, inverted)
- Background colors (light/dark mode)
- Border colors
- Shadow colors

**Recommendation:** Define these as Figma Variables with light/dark mode variants.

---

## Spacing Scale (4px Grid)

Inferred from layout analysis. These follow the 4px increment system defined in CLAUDE.md:

| Token | Value | Common Usage |
|-------|-------|--------------|
| `0x` | 0px | No spacing |
| `1x` | 4px | Minimal spacing |
| `2x` | 8px | Tight spacing |
| `3x` | 12px | Small spacing |
| `4x` | 16px | Base unit |
| `5x` | 20px | Medium spacing |
| `6x` | 24px | Standard spacing |
| `8x` | 32px | Large spacing |
| `9x` | 36px | Extra spacing |
| `10x` | 40px | Section spacing |
| `12x` | 48px | Section spacing |
| `14x` | 56px | Large section |
| `15x` | 60px | Large section |
| `16x` | 64px | Very large |
| `20x` | 80px | Extra large |
| `24x` | 96px | Huge spacing |
| `35x` | 140px | Massive spacing |

### ⚠️ Non-Grid Values Found

Some elements use values not on the 4px grid:
- 2px, 3px, 5px, 10px, 15px

**Recommendation:** Review these in Figma and align to the 4px grid system.

---

## Components

### Component Sets (with variants)

1. **button**
   - Variants: default, hover, pressed, copied
   - States for interactive behavior

2. **link**
   - Variants detected but need review

3. **menu**
   - Interactive menu component
   - Includes "Tooltip" sub-component

4. **Frame 121**
   - ⚠️ Needs proper naming

### Theme Variants

Multiple theme variants detected:
- Light, Light2
- Dark
- Theme3, Theme4, Theme6

**Recommendation:** Consolidate to light/dark mode structure as per CLAUDE.md.

---

## File Structure

### Pages

1. **Production** (ID: 455:24) ⭐
   - This is your source of truth per CLAUDE.md
   - Currently appears empty or minimal

2. **Page 1** (ID: 0:1)
   - Contains most of the current work
   - Has design exploration content

### ⚠️ Production Page Issue

The "Production" page is designated as your source of truth but appears to have minimal content. You should:

1. Move finalized components to the Production page
2. Organize with clear naming convention:
   - `page/home`
   - `page/case-study-[name]`
   - `page/about`
   - `page/contact`

---

## Next Steps

### High Priority

1. **Regenerate Figma API Token** with `file_variables:read` scope
   - This will allow direct access to Variables
   - More accurate color, spacing, and token extraction

2. **Organize Production Page**
   - Move finalized designs to Production page
   - Use naming convention: `page/[page-name]`
   - Define shared components clearly

3. **Define Missing Color Variables**
   - Primary colors (brand)
   - Text colors (body, muted, inverted)
   - Background colors (light/dark variants)
   - Border colors
   - Shadow colors

4. **Audit Spacing**
   - Fix non-4px-grid values (2px, 3px, 5px, 10px, 15px)
   - Ensure all spacing uses the token system

5. **Component Naming**
   - Rename "Frame 121" to meaningful name
   - Consolidate theme variants to light/dark structure

### Can Proceed Now

Even without perfect Figma organization, we can:

1. **Create Tailwind config** with current tokens
2. **Draft MDX case study structure** to identify component needs
3. **Build atomic components** (Button, Text, etc.) based on extracted styles
4. **Iterate** as Figma design system matures

---

## Summary

**What's Working:**
✅ Typography system is well-defined
✅ 4px spacing grid is mostly followed
✅ Component structure exists
✅ Font Awesome 6 Pro is the icon system

**What Needs Attention:**
⚠️ Regenerate API token for Variables access
⚠️ Organize Production page as source of truth
⚠️ Define comprehensive color system
⚠️ Fix non-grid spacing values
⚠️ Clean up theme variant structure

---

**Next Actions:**
1. Review these findings with Brandon
2. Prioritize: API token regeneration OR proceed with current data
3. Begin either:
   - Design system cleanup in Figma
   - OR start building with what we have (hybrid approach)
