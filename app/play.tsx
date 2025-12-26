import { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { OrigamiBackground, BottomSheet, SwipeCard, SwipeHints, CloudIcon } from "../src/components";
import { useSession } from "../src/context/SessionContext";
import { colors, shadows } from "../src/theme";
import { Feather } from "@expo/vector-icons";

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
    // Redirect to home if no session
    if (!session || !session.currentPrompt) {
      router.replace("/home");
    }
  }, [session]);

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
      <OrigamiBackground variant="warm" />

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
          <Feather name="more-horizontal" size={24} color={colors.foreground} />
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
                <CloudIcon size={32} color={colors.mutedForeground} />
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
            <CloudIcon size={24} color={colors.foreground} />
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
    fontSize: 18,
    fontFamily: "Caveat_500Medium",
    color: colors.mutedForeground,
  },
  playerName: {
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
    ...shadows.cardHover,
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
    fontSize: 24,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
    textAlign: "center",
    lineHeight: 32,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
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
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteTitle: {
    fontSize: 20,
    fontFamily: "Caveat_500Medium",
    color: colors.foreground,
  },
  noteText: {
    fontSize: 18,
    fontFamily: "Caveat_500Medium",
    color: colors.mutedForeground,
    fontStyle: "italic",
    textAlign: "center",
  },
});

