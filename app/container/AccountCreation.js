import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import { Svg, Path, Defs, RadialGradient, Ellipse, Stop } from 'react-native-svg';
import { RNCamera } from 'react-native-camera';

import Button from '../element/Button.js';

const ImageOverlay = () => {
    return (
        <Svg
            viewBox='0 0 24 24'
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 1
            }}
        >
            <Defs>
                <RadialGradient
                    id='grad'
                    cy='50%' cx='50%'
                    fy='50%' fx='50%'
                >
                    <Stop offset='0%' stopColor='#06adab' stopOpacity='0.2' />
                    <Stop offset='100%' stopColor='#06adab' stopOpacity='1' />
                </RadialGradient>
            </Defs>
            <Ellipse
                cy='12' cx='12'
                strokeWidth='5'
                ry='14.5' rx='14.5'
                stroke='url(#grad)'
            />
        </Svg>
    );
}

const AccountCreation = ({ navigation }) => {
    const [ takingPicture, setTakingPicture ] = useState(false);
    const [ picture, setPicture ] = useState(null);

    const takePicture = async (camera) => {
        if (!takingPicture) {
            setTakingPicture(true);
            const options = {
                quality: 0.5,
                base64: true
            };
            const data = await camera.takePictureAsync(options);
            setPicture(data.base64);
            setTakingPicture(false);
        }
    }

    return (
        <View>
            <View
                style={{
                    height: 60,
                    borderColor: '#252a3440',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('StartScreen');
                    }}
                >
                    <Svg viewBox='0 0 24 24' style={{ height: 30, width: 30 }}>
                        <Path fill='#08d9d6' d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z' />
                    </Svg>
                </TouchableOpacity>
                <Text style={{ color: '#252a34', fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>
                    Account Creation
                </Text>
                <View style={{ width: 30 }}></View>
            </View>
            <ScrollView>
                <View
                    style={{
                        marginBottom: 14,
                        alignItems: 'center',
                        backgroundColor: '#06adab'
                    }}
                >
                    {
                        picture ?
                            <View
                                style={{
                                    height: 250,
                                    aspectRatio: 1
                                }}
                            >
                                <Image
                                    style={{
                                        aspectRatio: 1
                                    }}
                                    source={{ uri: 'data:image/jpeg;base64,' +  picture, isStatic: true }}
                                />
                                <ImageOverlay />
                            </View>
                        :
                            <RNCamera
                                ref={ (ref) => { this.camera = ref } }
                                style={{
                                    height: 250,
                                    aspectRatio: 1
                                }}
                                captureAudio={ false }
                                type={ RNCamera.Constants.Type.front }
                                ratio='1:1'
                            >
                                {({ camera, status }) => {
                                    if (status !== 'READY')
                                        return (
                                            <View style={{ width: '100%', height: '100%', backgroundColor: '#08d9d6' }}>
                                            </View>
                                        );
                                    return <ImageOverlay />;
                                }}
                            </RNCamera>
                    }
                    <TouchableOpacity
                        onPress={ () => picture ? setPicture(null) : takePicture(this.camera) }
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 250,
                            opacity: 0,
                            zIndex: 2,
                            backgroundColor: '#ffffff'
                        }}
                        activeOpacity={ 1 }
                    >
                    </TouchableOpacity>
                    <Svg
                        viewBox='0 0 24 24'
                        style={{ height: 40, width: 40, position: 'absolute', top: 0, left: 0, margin: 10 }}
                    >
                        <Path fill='#ffffff' d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' />
                    </Svg>
                </View>
                <View style={{ padding: 8 }}>
                    <Text style={ styles.formTitle }>NAME</Text>
                    <View style={ styles.formTextContainer }>
                        <TextInput
                            textContentType='name'
                            style={ styles.formText }
                            placeholder='Ashley Yeon'
                        />
                        <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                            <Path fill='#08d9d6' d='M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z' />
                        </Svg>
                    </View>

                    <Text style={ styles.formTitle }>EMAIL</Text>
                    <View style={ styles.formTextContainer }>
                        <TextInput
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            style={ styles.formText }
                            placeholder='ashley.yeon@____.com'
                        />
                        <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                            <Path fill='#08d9d6' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                        </Svg>
                    </View>

                    <Text style={ styles.formTitle }>PHONE NUMBER</Text>
                    <View style={ styles.formTextContainer }>
                        <TextInput
                            maxLength={ 10 }
                            keyboardType='number-pad'
                            textContentType='telephoneNumber'
                            style={ styles.formText }
                            placeholder='(818) 486-____'
                        />
                        <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                            <Path fill='#08d9d6' d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z' />
                        </Svg>
                    </View>

                    <Text style={ styles.formTitle }>PASSWORD</Text>
                    <View style={ styles.formTextContainer }>
                        <TextInput
                            textContentType='password'
                            secureTextEntry={ true }
                            style={ styles.formText }
                            placeholder='••••••••••'
                        />
                        <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                            <Path fill='#08d9d6' d='M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' />
                        </Svg>
                    </View>

                    <Text style={ styles.formTitle }>CONFIRM PASSWORD</Text>
                    <View style={ styles.formTextContainer }>
                        <TextInput
                            textContentType='password'
                            secureTextEntry={ true }
                            style={ styles.formText }
                            placeholder='••••••••••'
                        />
                        <Svg viewBox='0 0 24 24' style={{ height: 20, width: 20 }}>
                            <Path fill='#08d9d6' d='M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' />
                        </Svg>
                    </View>

                    <Button title='Create Account' />
                </View>
            </ScrollView>
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

export default AccountCreation;
