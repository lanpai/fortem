import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    Image
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Svg, Path } from 'react-native-svg';
import DocumentPicker from 'react-native-document-picker';

import { getConversations, getDoctor, getMessages, sendMessage, sendFile, getID, setAsRead } from '../api.js';

const Stack = createStackNavigator();

const ChatOption = ({ info, navigation }) => {
    const date = new Date(info.messages[0].timestamp * 1000)

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
                <Image
                    style={{
                        aspectRatio: 1,
                        height: 55,
                        width: 55,
                        marginRight: 10,
                        borderRadius: 30
                    }}
                    source={{ uri: 'data:image/jpeg;base64,' + info.profile, isStatic: true }}
                />
                <View>
                    <Text style={{ color: '#252a34', fontSize: 17, fontWeight: 'bold' }}>
                        { info.name }
                    </Text>
                    <Text style={{ color: '#252a34', fontSize: 13 }}>{ info.jobTitle }</Text>
                    <Text
                        style={{
                            color: '#252a34',
                            fontWeight: info.messages[0].receiver === getID() && !info.messages[0].read ? 'bold' : 'normal'
                        }}
                    >
                        { info.messages[0].content }
                    </Text>
                </View>
            </View>
            <View>
                <Text style={{ color: '#252a34', fontSize: 13 }}>{ date.getMonth() + 1 }/{ date.getDate() }</Text>
            </View>
        </TouchableOpacity>
    );
};

const ChatSelect = ({ navigation }) => {
    const [ doctors, setDoctors ] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            let conversations = await getConversations();
            setDoctors(await Promise.all(conversations.map(async (id) => {
                return {
                    ...await getDoctor(id),
                    messages: await getMessages(id)
                };
            })));
        }

        fetch();
        const timer = setInterval(() => {
            fetch();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
                { doctors.map((info) =>
                    <ChatOption key={ info.id } info={ info } navigation={ navigation } />
                ) }
            </ScrollView>
        </View>
    );
};

const ChatConversation = ({ route, navigation }) => {
    const [ message, setMessage ] = useState('');
    const { info } = route.params;
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            setMessages(await getMessages(info.id));
        }

        setAsRead(info.id);
        fetchMessages();
        const timer = setInterval(fetchMessages, 1000);

        return () => {
            console.log('cleanup');
            clearInterval(timer);
        }
    }, []);

    const onSubmit = async () => {
        if (await sendMessage(info.id, message) === 'Success')
            setMessage('');
    }

    const onSelectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [ DocumentPicker.types.allFiles ],
            });
            Alert.alert('File Upload', 'Are you sure you want to upload:\n' + res.name, [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Upload',
                    onPress: () => {
                        Alert.alert('File Upload', await sendFile(res.uri));
                    }
                }
            ]);
        }
        catch (err) {
            console.log(err);
        }
    }

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
                { messages.map((message) =>
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
                                alignSelf: message.sender === getID() ? 'flex-end' : 'flex-start'
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
                <TextInput
                    onChangeText={(text) => setMessage(text)}
                    value={ message }
                    onSubmitEditing={() => onSubmit()}
                    style={{ flex: 1, fontSize: 16 }}
                    placeholder='Send a message'
                />
                <TouchableOpacity onPress={() => onSelectFile()} style={{ marginRight: 8 }}>
                    <Svg viewBox='0 0 24 24' style={{ height: 26, width: 26 }}>
                        <Path fill='#08d9d6' d='M21,10V4c0-1.1-0.9-2-2-2H3C1.9,2,1.01,2.9,1.01,4L1,16c0,1.1,0.9,2,2,2h11v-5c0-1.66,1.34-3,3-3H21z M11,11L3,6V4l8,5 l8-5v2L11,11z' />
                        <Path fill='#08d9d6' d='M21,14v4c0,1.1-0.9,2-2,2s-2-0.9-2-2v-4.5c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5V18h2v-4.5c0-1.38-1.12-2.5-2.5-2.5 S15,12.12,15,13.5V18c0,2.21,1.79,4,4,4s4-1.79,4-4v-4H21z' />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSubmit()}>
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
