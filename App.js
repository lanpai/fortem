import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './app/container/MainScreen.js';
import StartScreen from './app/container/StartScreen.js';
import AccountCreation from './app/container/AccountCreation.js';

const Stack = createStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="StartScreen" component={ StartScreen } />
                    <Stack.Screen name="AccountCreation" component={ AccountCreation } />
                    <Stack.Screen name="MainScreen" component={ MainScreen } />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
