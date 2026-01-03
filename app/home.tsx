import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { OrigamiBackground } from "../src/components";
import { colors, shadows } from "../src/theme";

const ahaCloud = require("../assets/images/app/ahacloud.png");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Home() {
  const router = useRouter();

  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(-10);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9);
  const logoY = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(10);
  const buttonOpacity = useSharedValue(0);
  const buttonY = useSharedValue(20);
  const profileOpacity = useSharedValue(0);
  const profileX = useSharedValue(20);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // Title animation
    titleOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    titleY.value = withSpring(0, { damping: 50, stiffness: 100 });

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

    // Tagline animation (appears after logo)
    setTimeout(() => {
      taglineOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
      taglineY.value = withSpring(0, { damping: 50, stiffness: 100 });
    }, 300);

    // Button animation
    buttonOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    buttonY.value = withSpring(0, { damping: 50, stiffness: 120 });

    // Profile animation
    profileOpacity.value = withTiming(1, { duration: 500 });
    profileX.value = withSpring(0, { damping: 50, stiffness: 120 });
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
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

      {/* App title - top center */}
      <Animated.Text style={[styles.title, titleStyle]}>aha</Animated.Text>

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
        <Animated.Text style={[styles.tagline, taglineStyle]}>
          {"Conversations to find out\nwho's really here."}
        </Animated.Text>
      </View>

      {/* Play button */}
      <AnimatedPressable
        style={[styles.playButton, buttonStyle]}
        onPress={handlePlayPress}
      >
        <Text style={styles.playButtonText}>Begin</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_400Regular",
    color: colors.foreground,
    textAlign: "center",
    marginTop: 16,
    letterSpacing: 3,
    opacity: 0.8,
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
    fontSize: 18,
    fontFamily: "Nunito_500Medium",
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
  tagline: {
    fontSize: 18,
    fontFamily: "Nunito_400Regular",
    color: colors.foreground,
    marginTop: 8,
    letterSpacing: 0.3,
    lineHeight: 26,
    textAlign: "center",
    opacity: 0.75,
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
    fontSize: 17,
    fontFamily: "Nunito_600SemiBold",
    color: colors.foreground,
    letterSpacing: 0.5,
  },
});

