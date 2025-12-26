import React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "../theme";

interface CloudIconProps {
  size?: number;
  color?: string;
}

export function CloudIcon({
  size = 24,
  color = colors.foreground,
}: CloudIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </Svg>
  );
}

