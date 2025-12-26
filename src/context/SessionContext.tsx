import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Depth, Prompt, getRandomPrompt } from "../data/prompts";

export interface Player {
  id: string;
  name: string;
  skips: number;
}

export interface Session {
  depth: Depth;
  players: Player[];
  currentPlayerIndex: number;
  currentPrompt: Prompt | null;
  usedPromptIds: string[];
  turnCount: number;
}

interface SessionContextType {
  session: Session | null;
  setDepth: (depth: Depth) => void;
  setPlayers: (players: Player[]) => void;
  startSession: () => void;
  skipPrompt: () => { punishment: boolean };
  answerPrompt: () => { everyone: boolean };
  resetPlayerSkips: (playerId: string) => void;
  nextPromptAfterPunishment: () => void;
  nextPromptAfterEveryone: () => void;
  endSession: () => void;
  getCurrentPlayer: () => Player | null;
}

const SessionContext = createContext<SessionContextType | null>(null);

const STORAGE_KEY = "aha_session";
const EVERYONE_INTERVAL = 8; // Show "Everyone" screen every N turns

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load session from AsyncStorage on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSession(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSession();
  }, []);

  // Persist session to AsyncStorage
  useEffect(() => {
    if (!isLoaded) return;

    const saveSession = async () => {
      try {
        if (session) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Failed to save session:", error);
      }
    };
    saveSession();
  }, [session, isLoaded]);

  const setDepth = useCallback((depth: Depth) => {
    setSession((prev) => ({
      depth,
      players: prev?.players || [],
      currentPlayerIndex: 0,
      currentPrompt: null,
      usedPromptIds: [],
      turnCount: 0,
    }));
  }, []);

  const setPlayers = useCallback((players: Player[]) => {
    setSession((prev) => (prev ? { ...prev, players } : null));
  }, []);

  const startSession = useCallback(() => {
    setSession((prev) => {
      if (!prev) return null;
      const prompt = getRandomPrompt(prev.depth, []);
      return {
        ...prev,
        currentPrompt: prompt,
        usedPromptIds: prompt ? [prompt.id] : [],
        currentPlayerIndex: 0,
        turnCount: 1,
      };
    });
  }, []);

  const skipPrompt = useCallback(() => {
    let punishment = false;
    setSession((prev) => {
      if (!prev || !prev.currentPrompt) return prev;

      const updatedPlayers = prev.players.map((p, i) =>
        i === prev.currentPlayerIndex ? { ...p, skips: p.skips + 1 } : p
      );

      const currentPlayer = updatedPlayers[prev.currentPlayerIndex];
      punishment = currentPlayer.skips >= 4;

      if (punishment) {
        // Don't get new prompt yet - punishment screen will handle it
        return { ...prev, players: updatedPlayers };
      }

      // Get new prompt for same player
      const newPrompt = getRandomPrompt(prev.depth, prev.usedPromptIds);
      return {
        ...prev,
        players: updatedPlayers,
        currentPrompt: newPrompt,
        usedPromptIds: newPrompt
          ? [...prev.usedPromptIds, newPrompt.id]
          : prev.usedPromptIds,
      };
    });
    return { punishment };
  }, []);

  const answerPrompt = useCallback(() => {
    let everyone = false;
    setSession((prev) => {
      if (!prev) return prev;

      const newTurnCount = prev.turnCount + 1;
      everyone = newTurnCount % EVERYONE_INTERVAL === 0;

      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      const newPrompt = getRandomPrompt(prev.depth, prev.usedPromptIds);

      return {
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
        currentPrompt: newPrompt,
        usedPromptIds: newPrompt
          ? [...prev.usedPromptIds, newPrompt.id]
          : prev.usedPromptIds,
        turnCount: newTurnCount,
      };
    });
    return { everyone };
  }, []);

  const resetPlayerSkips = useCallback((playerId: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        players: prev.players.map((p) =>
          p.id === playerId ? { ...p, skips: 0 } : p
        ),
      };
    });
  }, []);

  const nextPromptAfterPunishment = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;

      // Reset skips for current player
      const currentPlayer = prev.players[prev.currentPlayerIndex];
      const updatedPlayers = prev.players.map((p) =>
        p.id === currentPlayer.id ? { ...p, skips: 0 } : p
      );

      // Move to next player and get new prompt
      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      const newPrompt = getRandomPrompt(prev.depth, prev.usedPromptIds);

      return {
        ...prev,
        players: updatedPlayers,
        currentPlayerIndex: nextPlayerIndex,
        currentPrompt: newPrompt,
        usedPromptIds: newPrompt
          ? [...prev.usedPromptIds, newPrompt.id]
          : prev.usedPromptIds,
        turnCount: prev.turnCount + 1,
      };
    });
  }, []);

  const nextPromptAfterEveryone = useCallback(() => {
    // Just continue - the prompt is already set
  }, []);

  const endSession = useCallback(async () => {
    setSession(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  }, []);

  const getCurrentPlayer = useCallback(() => {
    if (!session) return null;
    return session.players[session.currentPlayerIndex] || null;
  }, [session]);

  return (
    <SessionContext.Provider
      value={{
        session,
        setDepth,
        setPlayers,
        startSession,
        skipPrompt,
        answerPrompt,
        resetPlayerSkips,
        nextPromptAfterPunishment,
        nextPromptAfterEveryone,
        endSession,
        getCurrentPlayer,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
}

