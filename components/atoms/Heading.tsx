import { forwardRef, type ElementType } from 'react';

/**
 * Heading component props
 * Maps to Figma typography tokens: heading-1, heading-2, heading-3, heading-4
 */
export interface HeadingProps {
  /**
   * Heading level (1-4) - determines both semantic HTML tag and styling
   * - 1: h1, 60px, for hero titles
   * - 2: h2, 48px, for page titles
   * - 3: h3, 36px, for section headers
   * - 4: h4, 24px, for subsection headers
   */
  level?: 1 | 2 | 3 | 4;

  /**
   * Content of the heading
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * ID for anchor links
   */
  id?: string;
}

/**
 * Heading component
 *
 * Renders semantic heading elements (h1-h4) with typography styles from Figma.
 * All headings use General Sans font at weight 600 with negative letter-spacing.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Hero Title</Heading>
 * <Heading level={2}>Page Title</Heading>
 * <Heading level={3} className="text-primary">Section Header</Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, children, className = '', id }, ref) => {
    // Map level to HTML tag
    const Tag = `h${level}` as ElementType;

    // Map level to utility class from globals.css
    const styleClass = `heading-${level}`;

    return (
      <Tag
        ref={ref}
        id={id}
        className={`${styleClass} ${className}`.trim()}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
