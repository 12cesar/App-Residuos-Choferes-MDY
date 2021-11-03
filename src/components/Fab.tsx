import React from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { mapaStyle } from '../theme/mapaTheme';

interface Props {
    iconName:string;
    onPress:()=>void;
    style?:StyleProp<ViewStyle>
}

export const Fab = ({iconName, onPress, style}:Props) => {
    return (
        <View style={{...style as any}}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPress}
                style={mapaStyle.blackButton}
            >
                <Icon
                    name={iconName}
                    color='white'
                    size={35}
                    style={{
                        left:1
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
