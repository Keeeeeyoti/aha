import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  FadeIn,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";
import { useEffect } from "react";
import { OrigamiBackground } from "../src/components";
import { useSession, Player } from "../src/context/SessionContext";
import { colors, shadows } from "../src/theme";
import { Feather } from "@expo/vector-icons";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Players() {
  const router = useRouter();
  const { setPlayers, startSession } = useSession();
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""]);

  // Animation values
  const backOpacity = useSharedValue(0);
  const backX = useSharedValue(-20);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(-20);
  const startButtonOpacity = useSharedValue(0);
  const startButtonY = useSharedValue(20);

  useEffect(() => {
    // Back button animation
    backOpacity.value = withTiming(1, { duration: 300 });
    backX.value = withSpring(0, { damping: 50, stiffness: 120 });

    // Title animation
    titleOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));
    titleY.value = withDelay(
      100,
      withSpring(0, { damping: 50, stiffness: 120 })
    );

    // Start button animation
    startButtonOpacity.value = withDelay(300, withTiming(1, { duration: 300 }));
    startButtonY.value = withDelay(
      300,
      withSpring(0, { damping: 50, stiffness: 120 })
    );
  }, []);

  const backStyle = useAnimatedStyle(() => ({
    opacity: backOpacity.value,
    transform: [{ translateX: backX.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const startButtonStyle = useAnimatedStyle(() => ({
    opacity: startButtonOpacity.value,
    transform: [{ translateY: startButtonY.value }],
  }));

  const addPlayer = () => {
    setPlayerNames([...playerNames, ""]);
  };

  const removePlayer = (index: number) => {
    if (playerNames.length <= 1) return;
    setPlayerNames(playerNames.filter((_, i) => i !== index));
  };

  const updatePlayer = (index: number, name: string) => {
    const updated = [...playerNames];
    updated[index] = name;
    setPlayerNames(updated);
  };

  const handleStart = () => {
    const validNames = playerNames.filter((name) => name.trim() !== "");
    if (validNames.length < 2) return;

    const players: Player[] = validNames.map((name, index) => ({
      id: `player-${index}-${Date.now()}`,
      name: name.trim(),
      skips: 0,
    }));

    setPlayers(players);
    startSession();
    router.push("/play");
  };

  const canStart = playerNames.filter((n) => n.trim() !== "").length >= 2;

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="calm" />

      {/* Back button */}
      <AnimatedPressable
        style={[styles.backButton, backStyle]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </AnimatedPressable>

      {/* Title */}
      <Animated.Text style={[styles.title, titleStyle]}>
        Who's here?
      </Animated.Text>

      {/* Player inputs */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {playerNames.map((name, index) => (
          <Animated.View
            key={index}
            entering={FadeIn.delay(index * 50)}
            exiting={FadeOutLeft.duration(200)}
            layout={Layout.springify().damping(50).stiffness(120)}
            style={styles.inputContainer}
          >
            <Text style={styles.inputLabel}>Player {index + 1}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Add name"
                placeholderTextColor={colors.mutedForeground}
                value={name}
                onChangeText={(text) => updatePlayer(index, text)}
              />
              {playerNames.length > 1 && (
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removePlayer(index)}
                >
                  <Feather name="x" size={20} color={colors.mutedForeground} />
                </Pressable>
              )}
            </View>
          </Animated.View>
        ))}

        {/* Add player button */}
        <Pressable style={styles.addButton} onPress={addPlayer}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </ScrollView>

      {/* Start button */}
      <AnimatedPressable
        style={[
          styles.startButton,
          startButtonStyle,
          !canStart && styles.startButtonDisabled,
        ]}
        onPress={handleStart}
        disabled={!canStart}
      >
        <Text style={styles.startButtonText}>who's really here?</Text>
      </AnimatedPressable>
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
    textAlign: "center",
    marginBottom: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 24,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: colors.cardOverlay,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    textAlign: "center",
    color: colors.foreground,
    ...shadows.input,
  },
  removeButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    padding: 4,
  },
  addButton: {
    backgroundColor: colors.cardOverlay,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    alignItems: "center",
    ...shadows.cardHover,
  },
  addButtonText: {
    fontSize: 30,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
  },
  startButton: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
    ...shadows.button,
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    fontSize: 20,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
});

