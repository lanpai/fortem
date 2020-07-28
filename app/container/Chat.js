import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Svg, Path } from 'react-native-svg';

const Stack = createStackNavigator();

const ChatOption = ({ info, navigation }) => {
    return (
        <TouchableOpacity
            style={{
                height: 70,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 5,
                paddingRight: 10,
                marginHorizontal: 10,
            }}
            onPress={() => {
                navigation.navigate('ChatConversation', { info });
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                <Svg viewBox='0 0 24 24' style={{ height: 60, width: 60, marginRight: 5 }}>
                    <Path fill='#08d9d6' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
                </Svg>
                <View>
                    <Text style={{ color: '#252a34', fontSize: 17, fontWeight: 'bold' }}>
                        { info.name }
                    </Text>
                    <Text style={{ color: '#252a34', fontSize: 13 }}>{ info.practice }</Text>
                    <Text style={{ color: '#252a34', fontWeight: info.read ? 'normal' : 'bold' }}>
                        { info.messages[0].content }
                    </Text>
                </View>
            </View>
            <View>
                <Text style={{ color: '#252a34', fontSize: 13 }}>{ info.messages[0].timestamp }</Text>
            </View>
        </TouchableOpacity>
    );
};

const MY_ID = 3;
const SAMPLE_CHAT_OPTIONS = [
    {
        id: 5,
        name: 'Dr. John Doe, DDS',
        practice: 'Dentist',
        description: 'Description about me here',
        available: true,
        messages: [
            {
                id: 1,
                sender: 5,
                receiver: 3,
                timestamp: 'July 24',
                content: 'Make sure to floss!'
            },
            {
                id: 2,
                sender: 3,
                receiver: 5,
                timestamp: 'July 24',
                content: 'Of course I have.'
            },
            {
                id: 3,
                sender: 5,
                receiver: 3,
                timestamp: 'July 23',
                content: 'Have you been flossing?'
            }
        ],
        read: false
    },
    {
        id: 6,
        name: 'Dr. Ashley Yeon, MD',
        practice: 'Physician',
        description: 'Ashey Yeon\'s description',
        available: false,
        messages: [
            {
                id: 4,
                sender: 6,
                receiver: 3,
                timestamp: 'July 22',
                content: 'Has the inflammation gone?'
            }
        ],
        read: true
    },
];

const ChatSelect = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#ffffff', height: '100%' }}>
            <View
                style={{
                    height: 60,
                    borderColor: '#252a3440',
                    justifyContent: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingHorizontal: 15
                }}
            >
                    <Text style={{ color: '#252a34', fontSize: 24, fontWeight: 'bold', alignSelf: 'center', textAlign: 'center' }}>
                        Open Conversations
                    </Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
                { SAMPLE_CHAT_OPTIONS.map((info) =>
                    <ChatOption key={ info.id } info={ info } navigation={ navigation } />
                ) }
            </ScrollView>
        </View>
    );
};

const ChatConversation = ({ route, navigation }) => {
    console.log(route.params);
    const { info } = route.params;
    return (
        <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
            <View
                style={{
                    height: 60,
                    borderColor: '#252a3440',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ChatSelect');
                    }}
                >
                    <Svg viewBox='0 0 24 24' style={{ height: 30, width: 30 }}>
                        <Path fill='#08d9d6' d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z' />
                    </Svg>
                </TouchableOpacity>
                <Text style={{ color: '#252a34', fontSize: 24, fontWeight: 'bold' }}>
                    { info.name }
                </Text>
                <TouchableOpacity onPress={() => route.params.open(info)}>
                    <Svg viewBox='0 0 24 24' style={{ height: 30, width: 30 }}>
                        <Path fill='#08d9d6' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' />
                    </Svg>
                </TouchableOpacity>
            </View>
            <ScrollView
                ref={ (ref) => { this.scrollView = ref } }
                onContentSizeChange={ () => this.scrollView.scrollToEnd() }
            >
                { info.messages.map((message) =>
                    <View
                        key={ message.id }
                        style={{
                            padding: 8
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#08d9d6',
                                padding: 5,
                                maxWidth: '70%',
                                borderRadius: 7,
                                alignSelf: message.sender === MY_ID ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>{ message.content }</Text>
                        </View>
                    </View>
                ).reverse() }
            </ScrollView>
            <View style={{
                alignSelf: 'flex-end',
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
        </View>
    );
};

const Chat = ({ route }) => {
    return (
        <Stack.Navigator initialRouteName="ChatSelect" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ChatSelect" component={ ChatSelect } />
            <Stack.Screen name="ChatConversation" component={ ChatConversation } initialParams={ route.params } />
        </Stack.Navigator>
    );
};

export default Chat;
