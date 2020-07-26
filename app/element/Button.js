import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';

const Button = ({ onPress, title, style }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            style={{ backgroundColor: '#08d9d6', padding: 5, borderRadius: 10, ...style }}
            activeOpacity={ 0.6 }
        >
            <Text style={{ color: (style ? style.color : null) || '#ffffff', textAlign: 'center', fontSize: 16 }}>
                { title }
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
