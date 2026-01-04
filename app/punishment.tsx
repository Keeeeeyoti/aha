import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheet, OrigamiBackground, SwipeCard, SwipeHints } from "../src/components";
import { useSession } from "../src/context/SessionContext";
import { getRandomPunishmentPrompt } from "../src/data/prompts";

export default function Punishment() {
  const router = useRouter();
  const { getCurrentPlayer, nextPromptAfterPunishment, endSession } =
    useSession();

  const [showMenu, setShowMenu] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [punishment] = useState(() => getRandomPunishmentPrompt());

  const currentPlayer = getCurrentPlayer();

  useEffect(() => {
    // Only check on mount, not on currentPlayer changes
    if (!currentPlayer) {
      router.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDone = useCallback(() => {
    nextPromptAfterPunishment();
    router.push("/play");
  }, [nextPromptAfterPunishment, router]);

  const handleLeave = () => {
    endSession();
    router.replace("/home");
  };

  if (!currentPlayer) {
    return null;
  }

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="teal" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{currentPlayer.name}:</Text>

        <Pressable style={styles.menuButton} onPress={() => setShowMenu(true)}>
          <Feather name="more-horizontal" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Card area */}
      <View style={styles.cardArea}>
        <SwipeCard
          key="punishment"
          onSwipeLeft={handleDone}
          onSwipeRight={handleDone}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            <Text style={styles.punishmentTitle}>PUNISHMENT</Text>
            <Text style={styles.punishmentSubtitle}>
              You skipped 4 questions!
            </Text>
            <Text style={styles.punishmentText}>{punishment.text}</Text>
          </View>
        </SwipeCard>
      </View>

      {/* Swipe hints */}
      <SwipeHints leftText="done" rightText="done" />

      {/* Desktop button */}
      <Pressable style={styles.actionButton} onPress={handleDone}>
        <Text style={styles.actionButtonText}>Done →</Text>
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
    fontSize: 24,
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    padding: 24,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  punishmentTitle: {
    fontSize: 20,
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
    marginBottom: 12,
    letterSpacing: 2,
  },
  punishmentSubtitle: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    marginBottom: 24,
  },
  punishmentText: {
    fontSize: 18,
    fontFamily: "Quicksand_600SemiBold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 26,
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 16,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
    color: "#FFFFFF",
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
    fontSize: 18,
    fontFamily: "Quicksand_500Medium",
    color: "#FFFFFF",
  },
  modalContent: {
    alignItems: "center",
    gap: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  modalButtonFlex: {
    flex: 1,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
    color: "#FFFFFF",
  },
  modalButtonRow: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    marginTop: 8,
  },
  destructiveButton: {
    backgroundColor: "rgba(220, 80, 80, 0.8)",
    borderColor: "rgba(220, 80, 80, 0.9)",
  },
  destructiveText: {
    color: "#FFFFFF",
  },
});
