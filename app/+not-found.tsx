import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { OrigamiBackground } from "../src/components";
import { colors, shadows } from "../src/theme";

export default function NotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="sky" />

      <View style={styles.content}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>This screen doesn't exist.</Text>

        <Pressable style={styles.button} onPress={() => router.replace("/home")}>
          <Text style={styles.buttonText}>Go to home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontFamily: "Caveat_700Bold",
    color: colors.foreground,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    color: colors.mutedForeground,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    paddingHorizontal: 32,
    ...shadows.button,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
});
