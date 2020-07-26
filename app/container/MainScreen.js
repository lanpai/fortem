import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Svg, Path } from 'react-native-svg';

import Chat from './Chat.js';
import Map from './Map.js';

const Tab = createMaterialTopTabNavigator();

const ChatFilled = ({ color }) => {
    return (
        <Svg viewBox='0 0 24 24'>
            <Path fill={ color } d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z' />
        </Svg>
    );
};

const MapFilled = ({ color }) => {
    return (
        <Svg viewBox='0 0 24 24'>
            <Path fill={ color } d='M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z' />
        </Svg>
    );
};

const MainScreen = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#08d9d6',
                showIcon: true,
                showLabel: false,
                tabStyle: {
                    backgroundColor: '#eaeaea'
                },
                indicatorStyle: {
                    backgroundColor: '#08d9d6',
                    height: 2
                },
                iconStyle: {
                    width: 35,
                    height: 35
                }
            }}
            tabBarPosition='bottom'
        >
            <Tab.Screen
                name="Chat"
                component={ Chat }
                options={{
                    tabBarIcon: ({ focused, color }) => <ChatFilled color={ color } />
                }}
            />
            <Tab.Screen
                name="Map"
                component={ Map }
                options={{
                    tabBarIcon: ({ focused, color }) => <MapFilled color={ color } />
                }}
            />
        </Tab.Navigator>
    );
};

export default MainScreen;
