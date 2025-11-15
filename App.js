import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LevelSelectionScreen from './src/screens/LevelSelectionScreen';
import AddPlayersScreen from './src/screens/AddPlayersScreen';
import GameSessionScreen from './src/screens/GameSessionScreen';
import SessionEndScreen from './src/screens/SessionEndScreen';
import { Text } from 'react-native';

const Stack = createStackNavigator();

console.log('App is rendering');

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
                <Stack.Screen name="AddPlayers" component={AddPlayersScreen} />
                <Stack.Screen name="GameSession" component={GameSessionScreen} />
                <Stack.Screen name="SessionEnd" component={SessionEndScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    // Temporary fallback for debugging
    // return <Text>App is working</Text>;
}