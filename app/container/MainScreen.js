import React, { useState } from 'react';
import {
    StatusBar,
    View,
    ScrollView,
    TouchableOpacity,
    Animated,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Svg, Path } from 'react-native-svg';

import Button from '../element/Button.js';
import Chat from './Chat.js';
import Map from './Map.js';
import Menu from './Menu.js';

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

const MenuFilled = ({ color }) => {
    return (
        <Svg viewBox='0 0 24 24'>
            <Path fill={ color } d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
        </Svg>
    );
};

const MainScreen = ({ navigation }) => {
    const [ infoHeight ] = useState(new Animated.Value(0));
    const [ info, setInfo ] = useState({});
    const [ modalState, setModalState ] = useState('info');

    const open = (info) => {
        Animated.timing(infoHeight, {
            toValue: 200,
            duration: 200,
            useNativeDriver: false
        }).start();
        setInfo(info);
        setModalState('info');
    }

    const openLogout = () => {
        Animated.timing(infoHeight, {
            toValue: 120,
            duration: 200,
            useNativeDriver: false
        }).start();
        setModalState('logout');
    }

    const close = () => {
        Animated.timing(infoHeight, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    const infoElevation = infoHeight.interpolate({
        inputRange: [ 0, 200 ],
        outputRange: [ 0, 8 ]
    });

    return (
        <>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#08d9d6',
                    showIcon: true,
                    showLabel: false,
                    tabStyle: {
                        backgroundColor: '#ffffff'
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
                lazy={ true }
                swipeEnabled={ false }
                tabBarPosition='bottom'
            >
                <Tab.Screen
                    name="Chat"
                    component={ Chat }
                    options={{
                        tabBarIcon: ({ focused, color }) => <ChatFilled color={ color } />
                    }}
                    initialParams={{ open }}
                />
                <Tab.Screen
                    name="Map"
                    component={ Map }
                    options={{
                        tabBarIcon: ({ focused, color }) => <MapFilled color={ color } />
                    }}
                    initialParams={{ open }}
                />
                <Tab.Screen
                    name="Menu"
                    component={ Menu }
                    options={{
                        tabBarIcon: ({ focused, color }) => <MenuFilled color={ color } />
                    }}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                            openLogout();
                        }
                    }}
                />
            </Tab.Navigator>
            <Animated.View
                style={{
                    width: '100%',
                    height: infoHeight,
                    position: 'absolute',
                    bottom: 0,
                    paddingHorizontal: 14,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#ffffff',
                    elevation: infoElevation
                }}
            >
                <ScrollView contentContainerStyle={{ justifyContent: 'space-between', height: '100%' }}>
                    {
                        modalState === 'info' ?
                            <>
                                <TouchableOpacity onPress={() => close()}>
                                    <Svg viewBox='0 0 24 24' style={{ height: 40, width: 40, alignSelf: 'center' }}>
                                        <Path fill='#08d9d6' d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
                                    </Svg>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{ info.name }</Text>
                                    <Text>{ info.practice }</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{ info.available ? 'Available' : 'Not Available' }</Text>
                                    <Text>{ info.description }</Text>
                                </View>
                                <View style={{
                                    width: '100%',
                                    borderColor: '#252a3440',
                                    borderTopWidth: StyleSheet.hairlineWidth,
                                    paddingHorizontal: 7,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <TextInput style={{ flex: 1, fontSize: 16 }} placeholder='Send a message' />
                                    <TouchableOpacity>
                                        <Svg viewBox='0 0 24 24' style={{ height: 26, width: 26 }}>
                                            <Path fill='#08d9d6' d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                            </>
                        :
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#08d9d6', marginTop: 15 }}>
                                    Are you sure you want to log out?
                                </Text>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('StartScreen');
                                    }}
                                    style={{ marginTop: 5 }}
                                    title='Log out'
                                />
                                <Button onPress={() => close()} style={{ backgroundColor: '#ffffff', color: '#08d9d6' }} title='Cancel' />
                            </View>
                    }
                </ScrollView>
            </Animated.View>
        </>
    );
};

export default MainScreen;
