import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StatusBar,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Svg, Path } from 'react-native-svg';

import Button from '../element/Button.js';

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
    return (
        <View
            style={{
                height: '100%',
                paddingHorizontal: 40,
                justifyContent: 'center',
                backgroundColor: '#ffffff'
            }}
        >
            <View>
                <Text style={ styles.formTitle }>EMAIL</Text>
                <View style={ styles.formTextContainer }>
                    <TextInput
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        style={ styles.formText }
                        placeholder=''
                    />
                    <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                        <Path fill='#08d9d6' d='M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z' />
                    </Svg>
                </View>
                <Text style={ styles.formTitle }>PASSWORD</Text>
                <View style={ styles.formTextContainer }>
                    <TextInput
                        textContentType='password'
                        secureTextEntry={ true }
                        style={ styles.formText }
                        placeholder=''
                    />
                    <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                        <Path fill='#08d9d6' d='M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' />
                    </Svg>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AccountCreation')}>
                    <Text style={{ ...styles.formTitle, color: '#08d9d6' }}>Don't have an account?</Text>
                </TouchableOpacity>
                <Button
                    onPress={ () => navigation.navigate('MainScreen') }
                    style={{ backgroundColor: '#08d9d6', color: '#ffffff', marginTop: 10 }} title='Login'
                />
            </View>
        </View>
    );
}

const Select = ({ navigation }) => {
    return (
        <View
            style={{
                height: '100%',
                paddingHorizontal: 40,
                justifyContent: 'center',
                backgroundColor: '#06adab'
            }}
        >
            <View>
                <Button
                    onPress={ () => navigation.navigate('Login') }
                    style={{ backgroundColor: '#ffffff', color: '#06adab', marginBottom: 10 }} title='Login'
                />
                <Button
                    onPress={ () => navigation.navigate('AccountCreation') }
                    style={{ backgroundColor: 'transparent' }} title='Register'
                />
            </View>
        </View>
    );
}

const StartScreen = ({ navigation }) => {
    return (
        <View>
            <StatusBar backgroundColor='#06adab' />
            <View style={{ height: '100%', width: '100%' }}>
                <View
                    style={{
                        width: '100%',
                        flexGrow: 1,
                        backgroundColor: '#06adab',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 150
                    }}
                >
                    <View>
                        <Image style={{ width: 150, height: 150 }} source={ require('../images/fortemWhiteR.png') } />
                        <Text style={{ fontSize: 24, textAlign: 'center', color: '#ffffff', letterSpacing: 5 }}>FORTEM</Text>
                    </View>
                    <View style={{ height: '50%', width: '100%' }}>
                        <Stack.Navigator initialRouteName='Select' screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='Select' component={ Select } />
                            <Stack.Screen name='Login' component={ Login } />
                        </Stack.Navigator>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formTitle: {
        color: '#252a34',
        marginLeft: 5,
        fontSize: 13,
        fontWeight: 'bold'
    },
    formTextContainer: {
        borderColor: '#252a3440',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 5,
        marginBottom: 14,
        alignItems: 'center',
        flexDirection: 'row'
    },
    formText: {
        flexGrow: 1,
        paddingVertical: 0,
    }
});

export default StartScreen;
