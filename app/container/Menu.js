import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Button from '../element/Button.js';

const Menu = () => {
    return (
        <View style={{ height: '100%', backgroundColor: '#ffffff', padding: 8 }}>
            <View
                style={{
                    borderColor: '#252a3440',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginBottom: 10,
                    paddingBottom: 10
                }}
            >
                <Button style={{}} title='Update Profile' />
            </View>
            <Button title='Log Out' />
        </View>
    );
};

export default Menu;
