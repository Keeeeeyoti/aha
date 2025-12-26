import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { OrigamiBackground } from "../src/components";
import { colors, shadows } from "../src/theme";

const ahaCloud = require("../assets/images/app/ahacloud.png");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Home() {
  const router = useRouter();

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9);
  const logoY = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonY = useSharedValue(20);
  const profileOpacity = useSharedValue(0);
  const profileX = useSharedValue(20);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // Logo animation
    logoOpacity.value = withTiming(1, { duration: 500 });
    logoScale.value = withTiming(1, { duration: 500 });

    // Floating animation
    logoY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Button animation
    buttonOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    buttonY.value = withSpring(0, { damping: 20, stiffness: 200 });

    // Profile animation
    profileOpacity.value = withTiming(1, { duration: 500 });
    profileX.value = withSpring(0, { damping: 20, stiffness: 200 });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoY.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonY.value }, { scale: buttonScale.value }],
  }));

  const profileStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
    transform: [{ translateX: profileX.value }],
  }));

  const handlePlayPress = () => {
    buttonScale.value = withSequence(
      withTiming(0.98, { duration: 50 }),
      withTiming(1, { duration: 100 })
    );
    router.push("/depth");
  };

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="sky" />

      {/* Profile icon - top right */}
      <AnimatedPressable style={[styles.profileButton, profileStyle]}>
        <Text style={styles.profileEmoji}>:)</Text>
      </AnimatedPressable>

      {/* Logo in center */}
      <View style={styles.logoContainer}>
        <Animated.Image
          source={ahaCloud}
          style={[styles.logo, logoStyle]}
          resizeMode="contain"
        />
      </View>

      {/* Play button */}
      <AnimatedPressable
        style={[styles.playButton, buttonStyle]}
        onPress={handlePlayPress}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  profileButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.cardHover,
  },
  profileEmoji: {
    fontSize: 24,
    fontFamily: "Caveat_500Medium",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 360,
    height: 360,
  },
  playButton: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    alignItems: "center",
    ...shadows.button,
  },
  playButtonText: {
    fontSize: 24,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
});

