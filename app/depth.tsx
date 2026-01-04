import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { OrigamiBackground } from "../src/components";
import { useSession } from "../src/context/SessionContext";
import { Depth as DepthType } from "../src/data/prompts";

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

  useEffect(() => {
    // Back button animation
    backOpacity.value = withTiming(1, { duration: 300 });
    backX.value = withSpring(0, { damping: 50, stiffness: 120 });

    // Title animation
    titleOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));
    titleY.value = withDelay(100, withSpring(0, { damping: 50, stiffness: 120 }));
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
      <OrigamiBackground variant="teal" />

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
        {depths.map((depth) => (
          <Pressable
            key={depth.value}
            style={styles.optionButton}
            onPress={() => handleSelect(depth.value)}
          >
            <Text style={styles.optionButtonText}>{depth.label}</Text>
          </Pressable>
        ))}
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 20,
    fontFamily: "Quicksand_500Medium",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 16,
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 20,
    fontFamily: "Quicksand_600SemiBold",
    color: "#FFFFFF",
  },
});
