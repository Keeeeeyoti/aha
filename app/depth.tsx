import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";
import { OrigamiBackground } from "../src/components";
import { useSession } from "../src/context/SessionContext";
import { Depth as DepthType } from "../src/data/prompts";
import { colors, shadows } from "../src/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const depths: { value: DepthType; label: string }[] = [
  { value: "light", label: "light" },
  { value: "medium", label: "medium" },
  { value: "deep", label: "deep" },
];

export default function Depth() {
  const router = useRouter();
  const { setDepth } = useSession();

  // Animation values
  const backOpacity = useSharedValue(0);
  const backX = useSharedValue(-20);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(-20);
  const buttonOpacities = depths.map(() => useSharedValue(0));
  const buttonYs = depths.map(() => useSharedValue(20));

  useEffect(() => {
    // Back button animation
    backOpacity.value = withTiming(1, { duration: 300 });
    backX.value = withSpring(0, { damping: 50, stiffness: 120 });

    // Title animation
    titleOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));
    titleY.value = withDelay(100, withSpring(0, { damping: 50, stiffness: 120 }));

    // Button animations - staggered
    depths.forEach((_, index) => {
      const delay = 150 + index * 100;
      buttonOpacities[index].value = withDelay(delay, withTiming(1, { duration: 300 }));
      buttonYs[index].value = withDelay(delay, withSpring(0, { damping: 50, stiffness: 120 }));
    });
  }, []);

  const backStyle = useAnimatedStyle(() => ({
    opacity: backOpacity.value,
    transform: [{ translateX: backX.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const handleSelect = (depth: DepthType) => {
    setDepth(depth);
    router.push("/players");
  };

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="warm" />

      {/* Back button */}
      <AnimatedPressable
        style={[styles.backButton, backStyle]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </AnimatedPressable>

      {/* Title */}
      <Animated.Text style={[styles.title, titleStyle]}>
        Choose the depth...
      </Animated.Text>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Depth options */}
      <View style={styles.optionsContainer}>
        {depths.map((depth, index) => {
          const buttonStyle = useAnimatedStyle(() => ({
            opacity: buttonOpacities[index].value,
            transform: [{ translateY: buttonYs[index].value }],
          }));

          return (
            <AnimatedPressable
              key={depth.value}
              style={[styles.optionButton, buttonStyle]}
              onPress={() => handleSelect(depth.value)}
            >
              <Text style={styles.optionButtonText}>{depth.label}</Text>
            </AnimatedPressable>
          );
        })}
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    ...shadows.cardHover,
  },
  backButtonText: {
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
  },
  title: {
    fontSize: 32,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
    marginBottom: 48,
  },
  spacer: {
    flex: 1,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 48,
  },
  optionButton: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    alignItems: "center",
    ...shadows.button,
  },
  optionButtonText: {
    fontSize: 24,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
});

