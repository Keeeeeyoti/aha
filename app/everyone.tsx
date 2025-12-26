import { useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { OrigamiBackground, BottomSheet, SwipeCard, SwipeHints } from "../src/components";
import { useSession } from "../src/context/SessionContext";
import { getRandomEveryonePrompt } from "../src/data/prompts";
import { colors, shadows } from "../src/theme";
import { Feather } from "@expo/vector-icons";

export default function Everyone() {
  const router = useRouter();
  const { nextPromptAfterEveryone, endSession } = useSession();

  const [showMenu, setShowMenu] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [prompt] = useState(() => getRandomEveryonePrompt());

  const handleContinue = useCallback(() => {
    nextPromptAfterEveryone();
    router.push("/play");
  }, [nextPromptAfterEveryone, router]);

  const handleLeave = () => {
    endSession();
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="calm" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Everyone:</Text>

        <Pressable style={styles.menuButton} onPress={() => setShowMenu(true)}>
          <Feather name="more-horizontal" size={24} color={colors.foreground} />
        </Pressable>
      </View>

      {/* Card area */}
      <View style={styles.cardArea}>
        <SwipeCard
          key={prompt.id}
          onSwipeLeft={handleContinue}
          onSwipeRight={handleContinue}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            <Text style={styles.promptText}>{prompt.text}</Text>
          </View>
        </SwipeCard>
      </View>

      {/* Swipe hints */}
      <SwipeHints leftText="continue" rightText="continue" />

      {/* Desktop button */}
      <Pressable style={styles.actionButton} onPress={handleContinue}>
        <Text style={styles.actionButtonText}>Continue →</Text>
      </Pressable>

      {/* Menu bottom sheet */}
      <BottomSheet isOpen={showMenu} onClose={() => setShowMenu(false)}>
        <View style={styles.menuContent}>
          <Pressable
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              setShowLeaveConfirm(true);
            }}
          >
            <Text style={styles.menuItemText}>Leave</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => setShowMenu(false)}>
            <Text style={styles.menuItemText}>Cancel</Text>
          </Pressable>
        </View>
      </BottomSheet>

      {/* Leave confirmation */}
      <BottomSheet
        isOpen={showLeaveConfirm}
        onClose={() => setShowLeaveConfirm(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>End session?</Text>
          <Text style={styles.modalText}>
            Are you sure you want to leave?
          </Text>
          <View style={styles.modalButtonRow}>
            <Pressable
              style={[styles.modalButton, styles.modalButtonFlex]}
              onPress={() => setShowLeaveConfirm(false)}
            >
              <Text style={styles.modalButtonText}>Stay</Text>
            </Pressable>
            <Pressable
              style={[
                styles.modalButton,
                styles.modalButtonFlex,
                styles.destructiveButton,
              ]}
              onPress={handleLeave}
            >
              <Text style={[styles.modalButtonText, styles.destructiveText]}>
                Leave
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.cardHover,
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 380,
  },
  card: {
    backgroundColor: colors.cardOverlay,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    padding: 24,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.cardHover,
  },
  promptText: {
    fontSize: 24,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
    textAlign: "center",
    lineHeight: 32,
  },
  actionButton: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    alignItems: "center",
    ...shadows.button,
  },
  actionButtonText: {
    fontSize: 18,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
  menuContent: {
    gap: 8,
  },
  menuItem: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
  },
  modalContent: {
    alignItems: "center",
    gap: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Caveat_500Medium",
    color: colors.mutedForeground,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: colors.cardOverlay95,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.foregroundLight,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 8,
    ...shadows.button,
  },
  modalButtonFlex: {
    flex: 1,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 18,
    fontFamily: "Caveat_600SemiBold",
    color: colors.foreground,
  },
  modalButtonRow: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    marginTop: 8,
  },
  destructiveButton: {
    backgroundColor: colors.destructive,
    borderColor: colors.destructive,
  },
  destructiveText: {
    color: colors.destructiveForeground,
  },
});

