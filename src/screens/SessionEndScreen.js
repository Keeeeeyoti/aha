import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const SessionEndScreen = ({ navigation }) => {
    const handleSaveAndExit = () => {
        // Save game state here
        navigation.navigate('Home');
    };

    const handleExitWithoutSaving = () => {
        // Clear game state here
        navigation.navigate('Home');
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Leaving so soon?</Text>
                        <Text style={styles.subtitle}>
                            Save your progress to continue this conversation later.
                        </Text>

                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={handleSaveAndExit}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.saveButtonText}>Save & Exit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.exitButton}
                            onPress={handleExitWithoutSaving}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.exitButtonText}>Exit Without Saving</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    modalContainer: {
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: '#FDFBF5',
        borderRadius: 16,
        padding: 24,
        gap: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    saveButton: {
        backgroundColor: '#5E8C6A',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 0,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.24,
    },
    exitButton: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 12,
    },
    exitButtonText: {
        color: '#888888',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.24,
    },
});

export default SessionEndScreen;