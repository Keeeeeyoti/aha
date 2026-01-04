import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { BottomSheet, CloudIcon, OrigamiBackground, SwipeCard, SwipeHints } from "../src/components";
import { useSession } from "../src/context/SessionContext";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Play() {
  const router = useRouter();
  const { session, getCurrentPlayer, skipPrompt, answerPrompt, endSession } =
    useSession();

  const [showMenu, setShowMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const currentPlayer = getCurrentPlayer();

  useEffect(() => {
    // Redirect to home if no session (only on mount)
    if (!session || !session.currentPrompt) {
      router.replace("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only check on mount, not on session changes

  const handleSkip = useCallback(() => {
    const { punishment } = skipPrompt();
    if (punishment) {
      router.push("/punishment");
    } else {
      setCardKey((prev) => prev + 1);
    }
  }, [skipPrompt, router]);

  const handleAnswer = useCallback(() => {
    const { everyone } = answerPrompt();
    if (everyone) {
      router.push("/everyone");
    } else {
      setCardKey((prev) => prev + 1);
    }
  }, [answerPrompt, router]);

  const handleLeave = () => {
    endSession();
    router.replace("/home");
  };

  if (!session || !currentPlayer || !session.currentPrompt) {
    return null;
  }

  return (
    <View style={styles.container}>
      <OrigamiBackground variant="teal" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.skipCount}>
            Skipped {currentPlayer.skips} question
            {currentPlayer.skips !== 1 ? "s" : ""}
          </Text>
          <Text style={styles.playerName}>{currentPlayer.name}:</Text>
        </View>

        <Pressable style={styles.menuButton} onPress={() => setShowMenu(true)}>
          <Feather name="more-horizontal" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Card area */}
      <View style={styles.cardArea}>
        <SwipeCard
          key={cardKey}
          onSwipeLeft={handleSkip}
          onSwipeRight={handleAnswer}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            {/* Note indicator */}
            {session.currentPrompt.note && (
              <Pressable
                style={styles.noteButton}
                onPress={() => setShowNote(true)}
              >
                <CloudIcon size={32} color="rgba(255, 255, 255, 0.6)" />
              </Pressable>
            )}

            {/* Prompt text */}
            <View style={styles.promptContainer}>
              <Text style={styles.promptText}>{session.currentPrompt.text}</Text>
            </View>
          </View>
        </SwipeCard>
      </View>

      {/* Swipe hints */}
      <SwipeHints leftText="skip" rightText="answered" />

      {/* Desktop buttons */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.actionButton} onPress={handleSkip}>
          <Text style={styles.actionButtonText}>← Skip</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={handleAnswer}>
          <Text style={styles.actionButtonText}>Answered →</Text>
        </Pressable>
      </View>

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
          <Pressable
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              setShowHelp(true);
            }}
          >
            <Text style={styles.menuItemText}>Help</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => setShowMenu(false)}>
            <Text style={styles.menuItemText}>Cancel</Text>
          </Pressable>
        </View>
      </BottomSheet>

      {/* Help modal */}
      <BottomSheet isOpen={showHelp} onClose={() => setShowHelp(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How to play</Text>
          <Text style={styles.modalText}>
            Swipe left to skip a question (counts toward punishment).
          </Text>
          <Text style={styles.modalText}>
            Swipe right when you've answered to pass to the next player.
          </Text>
          <Pressable
            style={styles.modalButton}
            onPress={() => setShowHelp(false)}
          >
            <Text style={styles.modalButtonText}>Got it!</Text>
          </Pressable>
        </View>
      </BottomSheet>

      {/* Leave confirmation modal */}
      <BottomSheet
        isOpen={showLeaveConfirm}
        onClose={() => setShowLeaveConfirm(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>End session?</Text>
          <Text style={styles.modalText}>
            Are you sure you want to leave? Progress will be lost.
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

      {/* Note modal */}
      <BottomSheet isOpen={showNote} onClose={() => setShowNote(false)}>
        <View style={styles.modalContent}>
          <View style={styles.noteHeader}>
            <CloudIcon size={24} color="#FFFFFF" />
            <Text style={styles.noteTitle}>Notes from submitter</Text>
          </View>
          <Text style={styles.noteText}>"{session.currentPrompt.note}"</Text>
          <Pressable
            style={styles.modalButton}
            onPress={() => setShowNote(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
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
  skipCount: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "rgba(255, 255, 255, 0.6)",
  },
  playerName: {
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
  },
  noteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  promptContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  promptText: {
    fontSize: 20,
    fontFamily: "Quicksand_500Medium",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
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
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontFamily: "Quicksand_500Medium",
    color: "#FFFFFF",
  },
  noteText: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
    color: "rgba(255, 255, 255, 0.7)",
    fontStyle: "italic",
    textAlign: "center",
  },
});
