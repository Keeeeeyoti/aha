import { StyleSheet, Platform } from "react-native";

// Helper to create cross-platform shadows
const createShadow = (
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number
) => ({
  // Native shadow (iOS/Android)
  shadowColor: "hsl(25, 20%, 15%)",
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
  // Web shadow (boxShadow)
  ...(Platform.OS === "web" && {
    boxShadow: `0 ${offsetY}px ${radius * 2}px rgba(42, 35, 30, ${opacity})`,
  }),
});

// Color palette matching the original Lovable app
export const colors = {
  // Base theme
  background: "hsl(35, 30%, 97%)",
  foreground: "hsl(25, 20%, 15%)",
  card: "hsl(40, 40%, 98%)",
  cardForeground: "hsl(25, 20%, 15%)",
  muted: "hsl(35, 20%, 90%)",
  mutedForeground: "hsl(25, 15%, 45%)",
  destructive: "hsl(0, 70%, 55%)",
  destructiveForeground: "hsl(0, 0%, 100%)",
  border: "hsl(25, 20%, 20%)",

  // Aha origami palette
  aha: {
    skyTop: "#6BA3C7", // hsl(200, 55%, 65%)
    skyMid: "#A3CCC7", // hsl(180, 40%, 75%)
    skyBottom: "#DBA3C0", // hsl(340, 45%, 85%)
    peach: "#F2D9C4", // hsl(25, 60%, 88%)
    cream: "#F7F3ED", // hsl(40, 35%, 95%)
    sage: "#B8D4C4", // hsl(150, 25%, 80%)
    lavender: "#D9C4E8", // hsl(280, 30%, 88%)
    coral: "#EDB8A3", // hsl(12, 70%, 78%)
    teal: "#3D7A8A", // hsl(195, 45%, 35%) - splash bg
  },

  // Opacity helpers (for RN)
  foregroundLight: "rgba(42, 35, 30, 0.15)", // border color with 15% opacity
  foregroundShadow: "rgba(42, 35, 30, 0.08)", // shadow color
  foregroundOverlay: "rgba(42, 35, 30, 0.20)", // backdrop overlay
  cardOverlay: "rgba(250, 248, 245, 0.90)", // card with 90% opacity
  cardOverlay95: "rgba(250, 248, 245, 0.95)", // card with 95% opacity
};

// Gradient presets for LinearGradient
export const gradients = {
  teal: {
    colors: ["#8FB0B0", "#6B8E8E", "#5A7A7A"],
    locations: [0, 0.5, 1] as [number, number, number],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  sky: {
    colors: [colors.aha.skyTop, colors.aha.skyMid, colors.aha.skyBottom],
    locations: [0, 0.5, 1] as [number, number, number],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  warm: {
    colors: [colors.aha.cream, colors.aha.peach, "rgba(237, 184, 163, 0.6)"],
    locations: [0, 0.5, 1] as [number, number, number],
    start: { x: 0.3, y: 0 },
    end: { x: 0.7, y: 1 },
  },
  calm: {
    colors: [
      colors.aha.cream,
      "rgba(184, 212, 196, 0.5)",
      "rgba(217, 196, 232, 0.4)",
    ],
    locations: [0, 0.6, 1] as [number, number, number],
    start: { x: 0.35, y: 0 },
    end: { x: 0.65, y: 1 },
  },
  sunset: {
    colors: [
      "rgba(107, 163, 199, 0.7)",
      colors.aha.peach,
      "rgba(237, 184, 163, 0.7)",
    ],
    locations: [0, 0.4, 1] as [number, number, number],
    start: { x: 0.4, y: 0 },
    end: { x: 0.6, y: 1 },
  },
};

// Common shadow styles (cross-platform: iOS, Android, and Web)
export const shadows = {
  card: createShadow(4, 10, 0.08, 4),
  cardHover: createShadow(8, 15, 0.12, 6),
  button: createShadow(6, 12, 0.1, 5),
  input: createShadow(2, 6, 0.06, 2),
};

// Shared style definitions (can be used directly in StyleSheet or with className)
export const sharedStyles = StyleSheet.create({
  // Screen container
  screen: {
    flex: 1,
    padding: 24,
  },

  // Card styles
  card: {
    backgroundColor: colors.cardOverlay,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    ...shadows.card,
  },
  cardShadow: {
    ...shadows.cardHover,
  },

  // Button styles
  button: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingHorizontal: 32,
    paddingVertical: 16,
    ...shadows.button,
  },

  // Input styles
  input: {
    backgroundColor: colors.cardOverlay,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    textAlign: "center",
    color: colors.foreground,
    ...shadows.input,
  },

  // Typography
  textHand: {
    fontFamily: "Caveat_400Regular",
    color: colors.foreground,
  },
  textHandMedium: {
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
  },
  textHandSemibold: {
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
  textHandBold: {
    fontFamily: "Caveat_700Bold",
    color: colors.foreground,
  },
  textMuted: {
    color: colors.mutedForeground,
  },
});

