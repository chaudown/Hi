import { forwardRef, type ElementType } from 'react';

/**
 * Text component props
 * Maps to Figma typography tokens: paragraph-regular, paragraph-bold, paragraph-small
 */
export interface TextProps {
  /**
   * Text variant - determines font size, weight, and line height
   * - regular: 20px, weight 500, for default body text
   * - bold: 20px, weight 600, for emphasized text
   * - small: 16px, weight 500, for captions and metadata
   */
  variant?: 'regular' | 'bold' | 'small';

  /**
   * HTML element to render
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div' | 'label';

  /**
   * Content of the text element
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * ID for the element
   */
  id?: string;

  /**
   * HTML for attribute (when rendering as label)
   */
  htmlFor?: string;
}

/**
 * Text component
 *
 * Renders text elements with typography styles from Figma.
 * All text uses General Sans font with consistent line heights.
 *
 * @example
 * ```tsx
 * <Text>Default body text</Text>
 * <Text variant="bold">Emphasized text</Text>
 * <Text variant="small">Caption text</Text>
 * <Text as="span" variant="bold" className="text-primary">
 *   Inline bold text
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'regular',
      as = 'p',
      children,
      className = '',
      id,
      htmlFor,
    },
    ref
  ) => {
    // Map variant to utility class from globals.css
    const styleClass = `paragraph-${variant}`;

    // Get the HTML tag
    const Tag = as as ElementType;

    // Combine classes
    const combinedClassName = `${styleClass} ${className}`.trim();

    // Type assertion for ref since we're using a dynamic tag
    const elementRef = ref as React.Ref<any>;

    return (
      <Tag
        ref={elementRef}
        id={id}
        htmlFor={htmlFor}
        className={combinedClassName}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';
