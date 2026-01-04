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
      <OrigamiBackground variant="teal" />

      {/* App title - top center */}
      <Animated.Text style={[styles.title, titleStyle]}>aha</Animated.Text>

      {/* Profile icon - top right */}
      <AnimatedPressable style={[styles.profileButton, profileStyle]}>
        <Text style={styles.profileEmoji}>:)</Text>
      </AnimatedPressable>

      {/* Logo - independently positioned */}
      <View style={styles.logoContainer}>
        <Animated.Image
          source={ahaCloud}
          style={[styles.logo, logoStyle]}
          resizeMode="contain"
        />
      </View>

      {/* Tagline - independently positioned */}
      <Animated.Text style={[styles.tagline, taglineStyle]}>
        {"Conversations to find out\nwho's really here."}
      </Animated.Text>

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
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 16,
    letterSpacing: 3,
    opacity: 0.9,
  },
  profileButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileEmoji: {
    fontSize: 18,
    fontFamily: "Quicksand_500Medium",
    color: "#FFFFFF",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -250,      // 👈 Adjust this to move CLOUD up/down
  },
  logo: {
    width: 280,
    height: 280,
  },
  tagline: {
    fontSize: 18,
    fontFamily: "Quicksand_500Medium",
    color: "#FFFFFF",
    marginBottom: 100,    // 👈 Adjust this to move TAGLINE up/down (from button)
    letterSpacing: 0.3,
    lineHeight: 26,
    textAlign: "center",
    opacity: 0.85,
  },
  playButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 16,
    alignItems: "center",
  },
  playButtonText: {
    fontSize: 17,
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

