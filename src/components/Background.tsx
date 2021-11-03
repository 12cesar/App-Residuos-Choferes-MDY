import React from 'react'
import { View } from 'react-native'

export const Background = () => {
    return (
        <View
            style={{
                position:'absolute',
                backgroundColor:'#28ab91',
                top:-350,
                width:1000,
                height:1200,
                transform:[
                    {rotate:'-60deg'}
                ]
            }}

        />
    )
}
