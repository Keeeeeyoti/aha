import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import useSessionState from '../state/sessionState';
import prompts from '../data/prompts.json';

const { height } = Dimensions.get('window');

const GameSessionScreen = ({ navigation }) => {
    const { deck, players, turnIndex, nextTurn, usedPromptIds, markPromptUsed } = useSessionState();
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [progress, setProgress] = useState(0);

    const deckColors = {
        GREEN: { bg: '#D4E2D4', indicator: '#D4E2D4', name: 'Light Deck' },
        YELLOW: { bg: '#FDF0D5', indicator: '#FDF0D5', name: 'Medium Deck' },
        RED: { bg: '#E2B4B4', indicator: '#E2B4B4', name: 'Deep Deck' }
    };

    const deckColor = deckColors[deck] || deckColors.RED;

    useEffect(() => {
        if (deck) {
            const allPrompts = prompts[deck] || [];
            const availablePrompts = allPrompts.filter(
                (prompt) => !usedPromptIds[deck].has(prompt.id)
            );
            
            if (availablePrompts.length > 0) {
                const nextPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
                setCurrentPrompt(nextPrompt);
                markPromptUsed(deck, nextPrompt.id);
                
                // Calculate progress
                const used = usedPromptIds[deck].size;
                const total = allPrompts.length;
                setProgress((used / total) * 100);
            } else {
                setCurrentPrompt({ text: 'No more prompts available!' });
                setProgress(100);
            }
        }
    }, [deck, turnIndex]);

    const handleNext = () => {
        nextTurn();
    };

    return (
        <View style={[styles.container, { backgroundColor: deckColor.bg }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.deckInfo}>
                    <View style={[styles.deckIndicator, { backgroundColor: deckColor.indicator }]} />
                    <Text style={styles.deckName}>{deckColor.name}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('SessionEnd')}
                >
                    <Text style={styles.menuIcon}>⋯</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View 
                        style={[
                            styles.progressFill, 
                            { 
                                width: `${progress}%`,
                                backgroundColor: deckColor.indicator
                            }
                        ]} 
                    />
                </View>
            </View>

            {/* Question Card */}
            <View style={styles.cardContainer}>
                <Text style={styles.questionText}>
                    {currentPrompt?.text || 'Loading...'}
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.swipeText}>Swipe to continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 16,
    },
    deckInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    deckIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    deckName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#EAE8E3',
        opacity: 0.8,
    },
    menuButton: {
        padding: 8,
    },
    menuIcon: {
        fontSize: 24,
        color: '#EAE8E3',
        opacity: 0.8,
    },
    progressContainer: {
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    questionText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#EAE8E3',
        textAlign: 'center',
        lineHeight: 42,
        letterSpacing: -0.5,
        maxWidth: 500,
    },
    footer: {
        paddingBottom: 32,
        alignItems: 'center',
    },
    swipeText: {
        fontSize: 14,
        color: 'rgba(234, 232, 227, 0.6)',
        opacity: 1,
    },
});

export default GameSessionScreen;