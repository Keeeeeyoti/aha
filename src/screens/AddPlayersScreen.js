import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import useSessionState from '../state/sessionState';

const AddPlayersScreen = ({ navigation }) => {
    const { players, addPlayer, removePlayer } = useSessionState();
    const [newPlayers, setNewPlayers] = useState([
        { id: 1, name: '' },
        { id: 2, name: '' }
    ]);

    const handleAddPlayerField = () => {
        setNewPlayers([...newPlayers, { id: Date.now(), name: '' }]);
    };

    const handlePlayerNameChange = (id, name) => {
        setNewPlayers(newPlayers.map(p => 
            p.id === id ? { ...p, name } : p
        ));
    };

    const handleContinue = () => {
        // Add all non-empty players
        newPlayers.forEach(p => {
            if (p.name.trim()) {
                addPlayer(p.name.trim());
            }
        });
        
        if (newPlayers.filter(p => p.name.trim()).length >= 2) {
            navigation.navigate('GameSession');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Who's playing?</Text>
                <Text style={styles.subtitle}>Add at least two players to begin.</Text>

                {/* Player Input Fields */}
                <View style={styles.inputsContainer}>
                    {newPlayers.map((player, index) => (
                        <View key={player.id} style={styles.inputGroup}>
                            <Text style={styles.label}>Player {index + 1}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Add name"
                                placeholderTextColor="#64748B"
                                value={player.name}
                                onChangeText={(text) => handlePlayerNameChange(player.id, text)}
                            />
                        </View>
                    ))}
                </View>

                {/* Add Another Player Button */}
                <TouchableOpacity 
                    style={styles.addPlayerButton}
                    onPress={handleAddPlayerField}
                >
                    <Text style={styles.addPlayerIcon}>+</Text>
                    <Text style={styles.addPlayerText}>Add another player</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.continueButton}
                    onPress={handleContinue}
                    activeOpacity={0.9}
                >
                    <Text style={styles.continueButtonText}>Choose a Deck</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101622',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 8,
    },
    backButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#E0E0E0',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#E0E0E0',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(224, 224, 224, 0.7)',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    inputsContainer: {
        gap: 16,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#E0E0E0',
    },
    input: {
        backgroundColor: '#1c1f27',
        borderWidth: 1,
        borderColor: '#3b4354',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#E0E0E0',
    },
    addPlayerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        marginTop: 16,
    },
    addPlayerIcon: {
        fontSize: 20,
        color: '#6B8E23',
        fontWeight: '600',
    },
    addPlayerText: {
        fontSize: 16,
        color: '#6B8E23',
        fontWeight: '600',
    },
    footer: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: '#101622',
    },
    continueButton: {
        backgroundColor: '#6B8E23',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#6B8E23',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

export default AddPlayersScreen;