import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useSessionState from '../state/sessionState';

const LevelSelectionScreen = ({ navigation }) => {
    const { setDeck } = useSessionState();

    const handleLevelSelect = (level) => {
        setDeck(level);
        navigation.navigate('AddPlayers');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Aha</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Choose your depth</Text>
                <Text style={styles.subtitle}>Select a level to start the conversation.</Text>

                {/* Level Cards */}
                <View style={styles.cardsContainer}>
                    {/* Light Card */}
                    <TouchableOpacity 
                        style={[styles.card, styles.cardLight]}
                        onPress={() => handleLevelSelect('GREEN')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.iconCircle}>
                            <Text style={styles.cardIcon}>○</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Light</Text>
                            <Text style={styles.cardDescription}>
                                Warm up & connect. Easy, fun questions.
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Medium Card */}
                    <TouchableOpacity 
                        style={[styles.card, styles.cardMedium]}
                        onPress={() => handleLevelSelect('YELLOW')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.iconCircle}>
                            <Text style={styles.cardIcon}>▣</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Medium</Text>
                            <Text style={styles.cardDescription}>
                                Go a little deeper. Prompts that invite reflection.
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Deep Card */}
                    <TouchableOpacity 
                        style={[styles.card, styles.cardDeep]}
                        onPress={() => handleLevelSelect('RED')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.iconCircle}>
                            <Text style={styles.cardIcon}>◈</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Deep</Text>
                            <Text style={styles.cardDescription}>
                                Get vulnerable. Meaningful, introspective topics.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101622',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
    },
    backButton: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#E2E8F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#E2E8F0',
        letterSpacing: -0.27,
    },
    placeholder: {
        width: 48,
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
        color: '#E2E8F0',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    cardsContainer: {
        gap: 16,
    },
    card: {
        borderRadius: 16,
        padding: 24,
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    cardLight: {
        backgroundColor: '#2E4735',
    },
    cardMedium: {
        backgroundColor: '#5A4E2A',
    },
    cardDeep: {
        backgroundColor: '#5E3032',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 28,
        color: '#F8F7F5',
    },
    cardContent: {
        gap: 4,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#F8F7F5',
        letterSpacing: -0.36,
    },
    cardDescription: {
        fontSize: 16,
        color: '#F8F7F5',
        lineHeight: 24,
        opacity: 0.9,
    },
});

export default LevelSelectionScreen;