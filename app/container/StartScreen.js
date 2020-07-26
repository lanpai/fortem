import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StatusBar,
    Image
} from 'react-native';

import Button from '../element/Button.js';

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
                        justifyContent: 'space-around',
                        paddingVertical: 50
                    }}
                >
                    <View>
                        <Image style={{ width: 150, height: 150 }} source={ require('../images/fortemWhiteR.png') } />
                        <Text style={{ fontSize: 24, textAlign: 'center', color: '#ffffff', letterSpacing: 5 }}>FORTEM</Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 40
                        }}
                    >
                        <Button onPress={ () => navigation.navigate('MainScreen') } style={{ backgroundColor: '#ffffff', color: '#06adab', marginBottom: 10 }} title='Login' />
                        <Button onPress={ () => navigation.navigate('AccountCreation') } style={{ backgroundColor: 'transparent' }} title='Register' />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default StartScreen;
