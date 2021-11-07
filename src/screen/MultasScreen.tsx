import React, { useContext } from 'react'
import { View, Text, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import socket from '../socket/socketApi';
import { logoutStyle } from '../theme/logoutTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const MultasScreen = () => {
    const {logOut, user, token, validationMap} = useContext(AuthContext);
    const logoutMap=()=>{
        socket.emit('marcador-borrar', user?._id);
        logOut();
    }
    return (
        <View style={logoutStyle.container}>
            <Image
                source={{uri:'https://res.cloudinary.com/dertftoym/image/upload/v1636324774/user_1_qmezph.png'}}
                style={
                    logoutStyle.image
                }
            />
            <View style={logoutStyle.datos}>
                <Text style={logoutStyle.datosText}>{user?.nombre}</Text>
                <TouchableOpacity 
                    activeOpacity={0.6}
                    style={logoutStyle.buttonDatos}
                    onPress={()=>{logoutMap()}}
                >
                    <Text style={logoutStyle.textButton}>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
