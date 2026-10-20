"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { coolorsPalettes, ColorPalette, defaultPalette } from "@/data/colorPalettes";

interface PaletteContextType {
  palette: ColorPalette;
  allPalettes: ColorPalette[];
  setPaletteById: (id: string) => void;
  isSwitcherOpen: boolean;
  setIsSwitcherOpen: (open: boolean) => void;
}

const PaletteContext = createContext<PaletteContextType>({
  palette: defaultPalette,
  allPalettes: coolorsPalettes,
  setPaletteById: () => {},
  isSwitcherOpen: false,
  setIsSwitcherOpen: () => {},
});

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string>("vibrant-fiesta");
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  useEffect(() => {
    setSelectedId("vibrant-fiesta");
    try {
      localStorage.setItem("swaram_coolors_palette", "vibrant-fiesta");
    } catch {}
  }, []);

  const setPaletteById = (id: string) => {
    const found = coolorsPalettes.find((p) => p.id === id);
    if (found) {
      setSelectedId(id);
      try {
        localStorage.setItem("swaram_coolors_palette", id);
      } catch {}

      // Dynamically apply CSS variables to the document root so all components reflect changes seamlessly
      const root = document.documentElement;
      root.style.setProperty("--palette-page-bg", found.colors.pageBg);
      root.style.setProperty("--palette-card-bg", found.colors.cardBg);
      root.style.setProperty("--palette-card-border", found.colors.cardBorder);
      root.style.setProperty("--palette-surface-alt", found.colors.surfaceAlt);
      root.style.setProperty("--palette-text-primary", found.colors.textPrimary);
      root.style.setProperty("--palette-text-secondary", found.colors.textSecondary);
      root.style.setProperty("--palette-text-muted", found.colors.textMuted);
      root.style.setProperty("--palette-accent", found.colors.accent);
      root.style.setProperty("--palette-accent-hover", found.colors.accentHover);
      root.style.setProperty("--palette-accent-light", found.colors.accentLight);

      // Card 1
      root.style.setProperty("--palette-card1-bg", found.colors.metricCard1.bg);
      root.style.setProperty("--palette-card1-text", found.colors.metricCard1.text);
      root.style.setProperty("--palette-card1-badge-bg", found.colors.metricCard1.badgeBg);
      root.style.setProperty("--palette-card1-badge-text", found.colors.metricCard1.badgeText);
      root.style.setProperty("--palette-card1-icon-color", found.colors.metricCard1.iconColor);

      // Card 2
      root.style.setProperty("--palette-card2-bg", found.colors.metricCard2.bg);
      root.style.setProperty("--palette-card2-text", found.colors.metricCard2.text);
      root.style.setProperty("--palette-card2-badge-bg", found.colors.metricCard2.badgeBg);
      root.style.setProperty("--palette-card2-badge-text", found.colors.metricCard2.badgeText);
      root.style.setProperty("--palette-card2-icon-color", found.colors.metricCard2.iconColor);

      // Card 3
      root.style.setProperty("--palette-card3-bg", found.colors.metricCard3.bg);
      root.style.setProperty("--palette-card3-text", found.colors.metricCard3.text);
      root.style.setProperty("--palette-card3-badge-bg", found.colors.metricCard3.badgeBg);
      root.style.setProperty("--palette-card3-badge-text", found.colors.metricCard3.badgeText);
      root.style.setProperty("--palette-card3-icon-color", found.colors.metricCard3.iconColor);

      // Card 4
      root.style.setProperty("--palette-card4-bg", found.colors.metricCard4.bg);
      root.style.setProperty("--palette-card4-text", found.colors.metricCard4.text);
      root.style.setProperty("--palette-card4-badge-bg", found.colors.metricCard4.badgeBg);
      root.style.setProperty("--palette-card4-badge-text", found.colors.metricCard4.badgeText);
      root.style.setProperty("--palette-card4-icon-color", found.colors.metricCard4.iconColor);

      // Semantics
      root.style.setProperty("--palette-success", found.colors.success);
      root.style.setProperty("--palette-success-bg", found.colors.successBg);
      root.style.setProperty("--palette-success-text", found.colors.successText);
      root.style.setProperty("--palette-warning", found.colors.warning);
      root.style.setProperty("--palette-warning-bg", found.colors.warningBg);
      root.style.setProperty("--palette-error", found.colors.error);
      root.style.setProperty("--palette-error-bg", found.colors.errorBg);
    }
  };

  useEffect(() => {
    setPaletteById(selectedId);
  }, [selectedId]);

  const currentPalette = coolorsPalettes.find((p) => p.id === selectedId) || defaultPalette;

  return (
    <PaletteContext.Provider
      value={{
        palette: currentPalette,
        allPalettes: coolorsPalettes,
        setPaletteById,
        isSwitcherOpen,
        setIsSwitcherOpen,
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  return useContext(PaletteContext);
}
