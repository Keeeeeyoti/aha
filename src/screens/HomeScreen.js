import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.logo}>Aha</Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => navigation.navigate('LevelSelection')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.startButtonText}>Start New Game</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.continueButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.continueButtonText}>Continue Game</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5F2',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 64,
        fontWeight: '400',
        color: '#333333',
        letterSpacing: -1,
    },
    buttonContainer: {
        paddingHorizontal: 40,
        paddingBottom: 60,
        gap: 20,
    },
    startButton: {
        backgroundColor: '#6B8E23',
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    continueButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    continueButtonText: {
        color: '#6B8E23',
        fontSize: 16,
        fontWeight: '500',
    },
    settingsButton: {
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
    },
    settingsIcon: {
        fontSize: 28,
    },
});

export default HomeScreen;