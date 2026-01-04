import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  style?: any;
}

export function SwipeCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  style,
}: SwipeCardProps) {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  // Animate in on mount
  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 50, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const SWIPE_THRESHOLD = 100;

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX * 0.8;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe right - exit animation then callback
        translateX.value = withTiming(width, { duration: 200 }, () => {
          runOnJS(onSwipeRight)();
        });
        opacity.value = withTiming(0, { duration: 200 });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        // Swipe left - exit animation then callback
        translateX.value = withTiming(-width, { duration: 200 }, () => {
          runOnJS(onSwipeLeft)();
        });
        opacity.value = withTiming(0, { duration: 200 });
      } else {
        // Spring back
        translateX.value = withSpring(0, { damping: 50, stiffness: 150 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-200, 200],
      [-15, 15],
      Extrapolation.CLAMP
    );
    const opacityValue = interpolate(
      translateX.value,
      [-200, -100, 0, 100, 200],
      [0.5, 1, 1, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value * opacityValue,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, style, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

interface SwipeHintsProps {
  leftText?: string;
  rightText?: string;
}

export function SwipeHints({
  leftText = "skip",
  rightText = "answered",
}: SwipeHintsProps) {
  return (
    <View style={styles.hintsContainer}>
      <Text style={styles.hintText}>← {leftText}</Text>
      <Text style={styles.hintText}>{rightText} →</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  hintsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  hintText: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "rgba(255, 255, 255, 0.5)",
  },
});
