import { useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../src/theme";

const loadingBg = require("../assets/images/app/loading-bg.png");

export default function Splash() {
  const router = useRouter();
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Fade in the loader
    opacity.value = withDelay(300, withTiming(1, { duration: 300 }));

    // Navigate to home after delay
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const loaderStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Background color */}
      <View style={[styles.background, { backgroundColor: colors.aha.teal }]} />

      {/* Background image */}
      <Image
        source={loadingBg}
        style={styles.backgroundImage}
        resizeMode="contain"
      />

      {/* Loading spinner at bottom */}
      <Animated.View style={[styles.loaderContainer, loaderStyle]}>
        <ActivityIndicator size="large" color="rgba(255,255,255,0.8)" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    position: "absolute",
    bottom: 64,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

