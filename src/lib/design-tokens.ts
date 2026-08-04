/**
 * Design tokens — icon system (Phosphor).
 * Phosphor renders at `size` (width/height attributes); CSS size classes
 * (w-4, h-4) still win when both are present.
 */
export const iconTokens = {
  defaultWeight: "regular",
  weights: {
    thin: "thin",
    light: "light",
    regular: "regular",
    bold: "bold",
    fill: "fill",
    duotone: "duotone",
  },
  sizes: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 22,
    xl: 26,
    "2xl": 32,
  },
} as const;

export type IconSize = keyof typeof iconTokens.sizes;
export type IconWeight = keyof typeof iconTokens.weights;
