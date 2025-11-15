import { useState } from 'react';

const useSessionState = () => {
    const [deck, setDeck] = useState(null); // 'GREEN', 'YELLOW', or 'RED'
    const [players, setPlayers] = useState([]); // List of player names
    const [turnIndex, setTurnIndex] = useState(0); // Current player's turn
    const [usedPromptIds, setUsedPromptIds] = useState({ GREEN: new Set(), YELLOW: new Set(), RED: new Set() });

    const addPlayer = (name) => {
        setPlayers((prev) => [...prev, name]);
    };

    const removePlayer = (index) => {
        setPlayers((prev) => prev.filter((_, i) => i !== index));
    };

    const nextTurn = () => {
        setTurnIndex((prev) => (prev + 1) % players.length);
    };

    const markPromptUsed = (deck, promptId) => {
        setUsedPromptIds((prev) => {
            const updated = { ...prev };
            updated[deck].add(promptId);
            return updated;
        });
    };

    return {
        deck,
        setDeck,
        players,
        addPlayer,
        removePlayer,
        turnIndex,
        nextTurn,
        usedPromptIds,
        markPromptUsed,
    };
};

export default useSessionState;