import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "../theme";

interface OrigamiBackgroundProps {
  variant?: "teal" | "sky" | "warm" | "calm" | "sunset";
}

export function OrigamiBackground({ variant = "sky" }: OrigamiBackgroundProps) {
  const gradient = gradients[variant];

  return (
    <LinearGradient
      colors={gradient.colors}
      locations={gradient.locations}
      start={gradient.start}
      end={gradient.end}
      style={StyleSheet.absoluteFill}
    />
  );
}

