/**
 * Lightweight haptic feedback helper.
 * Falls back silently on devices/browsers that don't support Vibration API
 * (most desktops + iOS Safari) — no errors thrown.
 */

type HapticPattern = "light" | "medium" | "heavy" | "success";

const PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 35,
  success: [12, 40, 18],
};

export const haptic = (pattern: HapticPattern = "light") => {
  if (typeof window === "undefined") return;
  const nav = window.navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  if (typeof nav.vibrate !== "function") return;
  try {
    nav.vibrate(PATTERNS[pattern]);
  } catch {
    /* no-op */
  }
};
