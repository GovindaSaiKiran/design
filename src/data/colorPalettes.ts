// Professional Coolors Palette Registry extracted from curated trending color palettes
// Contains 5 distinct, high-impact, ultra-vibrant palettes with saturated card fills,
// bold contrasting borders, glowing drop shadows, and decorative geometric shapes.

export interface MetricCardStyle {
  bg: string;
  border: string;
  shadow: string;
  shapeFill: string;
  shapeStroke: string;
  text: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder?: string;
  iconBg: string;
  iconColor: string;
  iconBorder?: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  colors: {
    // Backgrounds
    pageBg: string;
    cardBg: string;
    cardBorder: string;
    surfaceAlt: string;
    // Ink / Typography
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    // Accent / Brand
    accent: string;
    accentHover: string;
    accentLight: string;
    accentText: string;
    // 4 Distinct Metric Card Fills (Vibrant, high-voltage)
    metricCard1: MetricCardStyle;
    metricCard2: MetricCardStyle;
    metricCard3: MetricCardStyle;
    metricCard4: MetricCardStyle;
    // Semantic Status
    success: string;
    successBg: string;
    successText: string;
    warning: string;
    warningBg: string;
    error: string;
    errorBg: string;
    // Heatmap Tiers
    heatmapTiers: [string, string, string, string];
  };
  // Visual Preview Swatches (5 colors)
  previewSwatches: [string, string, string, string, string];
}

export const coolorsPalettes: ColorPalette[] = [
  // 1. Vibrant Color Fiesta (Page 4) - 45.2K Likes (Vivid Golden Sunburst, Fire Orange, Electric Fuchsia, Electric Cobalt)
  {
    id: "vibrant-fiesta",
    name: "Vibrant Color Fiesta",
    subtitle: "High-Voltage Electric Pop",
    tagline: "Vivid golden sunburst, fire tangerine, deep rich burgundy, and sapphire blue",
    previewSwatches: ["#FFC837", "#FF6B08", "#610007", "#3B82F6", "#7C3AED"],
    colors: {
      pageBg: "linear-gradient(135deg, #FFFDF7 0%, #FFF9EE 45%, #FFF0D6 100%)",
      cardBg: "#FFFFFF",
      cardBorder: "rgba(255, 107, 8, 0.18)",
      surfaceAlt: "#FFF5E3",
      textPrimary: "#181410",
      textSecondary: "rgba(24, 20, 16, 0.7)",
      textMuted: "#8C7A68",
      accent: "#FF6B08",
      accentHover: "#E05A00",
      accentLight: "#FFF0D6",
      accentText: "#FFFFFF",
      metricCard1: {
        bg: "#FFC837", // Vivid Sunburst Yellow
        border: "#EAA600",
        shadow: "0 12px 28px -4px rgba(255, 200, 55, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.35)",
        shapeStroke: "rgba(180, 83, 9, 0.25)",
        text: "#2B1401",
        badgeBg: "#2B1401",
        badgeText: "#FFC837",
        badgeBorder: "rgba(255, 255, 255, 0.4)",
        iconBg: "#FFFFFF",
        iconColor: "#D97706",
        iconBorder: "rgba(234, 166, 0, 0.4)",
      },
      metricCard2: {
        bg: "#FF6B08", // Blazing Fire Orange
        border: "#D94E00",
        shadow: "0 12px 28px -4px rgba(255, 107, 8, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#EA580C",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard3: {
        bg: "#610007", // Deep Rich Burgundy / Maroon (from uploaded image)
        border: "#480005",
        shadow: "0 12px 28px -4px rgba(97, 0, 7, 0.48)",
        shapeFill: "rgba(255, 255, 255, 0.15)",
        shapeStroke: "rgba(255, 255, 255, 0.3)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.35)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#610007",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard4: {
        bg: "#3B82F6", // Electric Sapphire Blue
        border: "#1D4ED8",
        shadow: "0 12px 28px -4px rgba(59, 130, 246, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#2563EB",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      success: "#059669",
      successBg: "#D1FAE5",
      successText: "#065F46",
      warning: "#D97706",
      warningBg: "#FEF3C7",
      error: "#DC2626",
      errorBg: "#FEE2E2",
      heatmapTiers: ["#FED7AA", "#FB923C", "#EA580C", "#9A3412"],
    },
  },

  // 2. Vibrant Summer Neon (Page 11) - 17.4K Likes (Electric Coral, Mango Gold, Cyber Lime, Royal Purple)
  {
    id: "vibrant-summer",
    name: "Vibrant Summer Neon",
    subtitle: "Punchy Tropical Energy",
    tagline: "Electric coral, sun-drenched mango, cyber emerald, and royal purple",
    previewSwatches: ["#FF385C", "#FFA600", "#10B981", "#8B5CF6", "#06B6D4"],
    colors: {
      pageBg: "linear-gradient(135deg, #FCFBFD 0%, #F8F5FF 50%, #ECE7FF 100%)",
      cardBg: "#FFFFFF",
      cardBorder: "rgba(139, 92, 246, 0.18)",
      surfaceAlt: "#F4EFFF",
      textPrimary: "#170E2B",
      textSecondary: "rgba(23, 14, 43, 0.7)",
      textMuted: "#7E7494",
      accent: "#7C3AED",
      accentHover: "#6D28D9",
      accentLight: "#EDE9FE",
      accentText: "#FFFFFF",
      metricCard1: {
        bg: "#FF385C", // Electric Coral Punch
        border: "#D71338",
        shadow: "0 12px 28px -4px rgba(255, 56, 92, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#D71338",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard2: {
        bg: "#FFA600", // Sun-drenched Mango Gold
        border: "#D97706",
        shadow: "0 12px 28px -4px rgba(255, 166, 0, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.35)",
        shapeStroke: "rgba(180, 83, 9, 0.25)",
        text: "#361B01",
        badgeBg: "#361B01",
        badgeText: "#FFA600",
        badgeBorder: "rgba(255, 255, 255, 0.4)",
        iconBg: "#FFFFFF",
        iconColor: "#B45309",
        iconBorder: "rgba(217, 119, 6, 0.4)",
      },
      metricCard3: {
        bg: "#10B981", // Cyber Emerald Mint
        border: "#059669",
        shadow: "0 12px 28px -4px rgba(16, 185, 129, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#059669",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard4: {
        bg: "#8B5CF6", // Royal Electric Purple
        border: "#6D28D9",
        shadow: "0 12px 28px -4px rgba(139, 92, 246, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#7C3AED",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      success: "#10B981",
      successBg: "#D1FAE5",
      successText: "#065F46",
      warning: "#F59E0B",
      warningBg: "#FEF3C7",
      error: "#EF4444",
      errorBg: "#FEE2E2",
      heatmapTiers: ["#A7F3D0", "#34D399", "#10B981", "#047857"],
    },
  },

  // 3. Watermelon Sorbet & Cyan (Page 7) - 36.2K Likes (Watermelon Punch, Canary Yellow, Neon Mint, Ocean Blue)
  {
    id: "watermelon-sorbet",
    name: "Watermelon Sorbet",
    subtitle: "Vivid Coastal Contrast",
    tagline: "Juicy watermelon red, bright canary yellow, neon mint, and deep oceanic cobalt",
    previewSwatches: ["#FF2A6D", "#FFBE0B", "#05D9E8", "#0056B3", "#9B5DE5"],
    colors: {
      pageBg: "linear-gradient(135deg, #F8FDFF 0%, #EDF9FF 50%, #D8F2FE 100%)",
      cardBg: "#FFFFFF",
      cardBorder: "rgba(0, 86, 179, 0.18)",
      surfaceAlt: "#E6F6FE",
      textPrimary: "#072033",
      textSecondary: "rgba(7, 32, 51, 0.7)",
      textMuted: "#66859C",
      accent: "#0056B3",
      accentHover: "#004494",
      accentLight: "#E0F2FE",
      accentText: "#FFFFFF",
      metricCard1: {
        bg: "#FF2A6D", // Juicy Watermelon Punch
        border: "#D60045",
        shadow: "0 12px 28px -4px rgba(255, 42, 109, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#D60045",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard2: {
        bg: "#FFBE0B", // Bright Canary Yellow
        border: "#D99E00",
        shadow: "0 12px 28px -4px rgba(255, 190, 11, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.35)",
        shapeStroke: "rgba(180, 83, 9, 0.25)",
        text: "#2B1B01",
        badgeBg: "#2B1B01",
        badgeText: "#FFBE0B",
        badgeBorder: "rgba(255, 255, 255, 0.4)",
        iconBg: "#FFFFFF",
        iconColor: "#B45309",
        iconBorder: "rgba(217, 158, 0, 0.4)",
      },
      metricCard3: {
        bg: "#05D9E8", // Neon Electric Cyan
        border: "#00B2BE",
        shadow: "0 12px 28px -4px rgba(5, 217, 232, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.32)",
        shapeStroke: "rgba(0, 100, 120, 0.25)",
        text: "#022B30",
        badgeBg: "#022B30",
        badgeText: "#05D9E8",
        badgeBorder: "rgba(255, 255, 255, 0.4)",
        iconBg: "#FFFFFF",
        iconColor: "#008B94",
        iconBorder: "rgba(0, 178, 190, 0.4)",
      },
      metricCard4: {
        bg: "#0056B3", // Deep Oceanic Cobalt
        border: "#003D80",
        shadow: "0 12px 28px -4px rgba(0, 86, 179, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#0056B3",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      success: "#059669",
      successBg: "#D1FAE5",
      successText: "#065F46",
      warning: "#D97706",
      warningBg: "#FEF3C7",
      error: "#DC2626",
      errorBg: "#FEE2E2",
      heatmapTiers: ["#BAE6FD", "#38BDF8", "#0284C7", "#0369A1"],
    },
  },

  // 4. Purple Raindrops & Sunset (Page 4 & 5) - 25.3K Likes (Electric Violet, Hot Berry Magenta, Vivid Orange, Cyan Sky)
  {
    id: "purple-raindrops",
    name: "Purple Raindrops & Sunset",
    subtitle: "Electric Twilight Pulse",
    tagline: "Deep psychedelic violet, hot berry magenta, vivid sunset orange, and electric sky",
    previewSwatches: ["#7C3AED", "#EC4899", "#F97316", "#06B6D4", "#3B82F6"],
    colors: {
      pageBg: "linear-gradient(135deg, #FAF7FF 0%, #F5F0FE 50%, #E9DEFE 100%)",
      cardBg: "#FFFFFF",
      cardBorder: "rgba(124, 58, 237, 0.18)",
      surfaceAlt: "#F2EBFE",
      textPrimary: "#1B0F33",
      textSecondary: "rgba(27, 15, 51, 0.7)",
      textMuted: "#7E6E99",
      accent: "#7C3AED",
      accentHover: "#6D28D9",
      accentLight: "#EDE9FE",
      accentText: "#FFFFFF",
      metricCard1: {
        bg: "#7C3AED", // Psychedelic Electric Violet
        border: "#5B21B6",
        shadow: "0 12px 28px -4px rgba(124, 58, 237, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#6D28D9",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard2: {
        bg: "#EC4899", // Hot Berry Magenta
        border: "#BE185D",
        shadow: "0 12px 28px -4px rgba(236, 72, 153, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#DB2777",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard3: {
        bg: "#F97316", // Vivid Sunset Tangerine
        border: "#C2410C",
        shadow: "0 12px 28px -4px rgba(249, 115, 22, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#EA580C",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard4: {
        bg: "#06B6D4", // Electric Cyan Sky
        border: "#0E7490",
        shadow: "0 12px 28px -4px rgba(6, 182, 212, 0.45)",
        shapeFill: "rgba(255, 255, 255, 0.28)",
        shapeStroke: "rgba(0, 60, 80, 0.25)",
        text: "#052932",
        badgeBg: "#052932",
        badgeText: "#06B6D4",
        badgeBorder: "rgba(255, 255, 255, 0.4)",
        iconBg: "#FFFFFF",
        iconColor: "#0891B2",
        iconBorder: "rgba(14, 116, 144, 0.4)",
      },
      success: "#10B981",
      successBg: "#D1FAE5",
      successText: "#065F46",
      warning: "#F97316",
      warningBg: "#FFEDD5",
      error: "#EF4444",
      errorBg: "#FEE2E2",
      heatmapTiers: ["#DDD6FE", "#A78BFA", "#7C3AED", "#4C1D95"],
    },
  },

  // 5. Black & Vivid Gold Elegance (Page 2) - 54.4K Likes (Luminous Gold, Blazing Copper, Radiant Emerald, Indigo Sapphire)
  {
    id: "black-gold-vibrant",
    name: "Black & Vivid Gold",
    subtitle: "Executive High-Voltage Luxury",
    tagline: "Luminous imperial gold, blazing copper, neon emerald, and electric sapphire",
    previewSwatches: ["#0F172A", "#F59E0B", "#F97316", "#10B981", "#6366F1"],
    colors: {
      pageBg: "linear-gradient(135deg, #FAFBFD 0%, #F1F4F9 50%, #E2E8F0 100%)",
      cardBg: "#FFFFFF",
      cardBorder: "rgba(15, 23, 42, 0.16)",
      surfaceAlt: "#F1F5F9",
      textPrimary: "#0F172A",
      textSecondary: "rgba(15, 23, 42, 0.7)",
      textMuted: "#64748B",
      accent: "#0F172A",
      accentHover: "#000000",
      accentLight: "#FEF3C7",
      accentText: "#FFFFFF",
      metricCard1: {
        bg: "#F59E0B", // Luminous Imperial Gold
        border: "#B45309",
        shadow: "0 12px 28px -4px rgba(245, 158, 11, 0.5)",
        shapeFill: "rgba(255, 255, 255, 0.35)",
        shapeStroke: "rgba(180, 83, 9, 0.25)",
        text: "#331600",
        badgeBg: "#331600",
        badgeText: "#F59E0B",
        badgeBorder: "rgba(255, 255, 255, 0.4)",
        iconBg: "#FFFFFF",
        iconColor: "#B45309",
        iconBorder: "rgba(180, 83, 9, 0.4)",
      },
      metricCard2: {
        bg: "#F97316", // Blazing Sunset Copper
        border: "#C2410C",
        shadow: "0 12px 28px -4px rgba(249, 115, 22, 0.5)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#EA580C",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard3: {
        bg: "#10B981", // Radiant Sovereign Emerald
        border: "#047857",
        shadow: "0 12px 28px -4px rgba(16, 185, 129, 0.5)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#059669",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      metricCard4: {
        bg: "#6366F1", // Electric Indigo Sapphire
        border: "#4338CA",
        shadow: "0 12px 28px -4px rgba(99, 102, 241, 0.5)",
        shapeFill: "rgba(255, 255, 255, 0.22)",
        shapeStroke: "rgba(255, 255, 255, 0.4)",
        text: "#FFFFFF",
        badgeBg: "rgba(0, 0, 0, 0.28)",
        badgeText: "#FFFFFF",
        badgeBorder: "rgba(255, 255, 255, 0.3)",
        iconBg: "#FFFFFF",
        iconColor: "#4F46E5",
        iconBorder: "rgba(255, 255, 255, 0.8)",
      },
      success: "#10B981",
      successBg: "#D1FAE5",
      successText: "#065F46",
      warning: "#F59E0B",
      warningBg: "#FEF3C7",
      error: "#EF4444",
      errorBg: "#FEE2E2",
      heatmapTiers: ["#FDE68A", "#F59E0B", "#D97706", "#78350F"],
    },
  },
];

// Default recommended palette with ultra-vibrant colors & borders
export const defaultPalette = coolorsPalettes[0]; // Vibrant Color Fiesta
