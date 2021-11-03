import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { mapaStyle } from '../theme/mapaTheme';

export const MultasScreen = () => {
    const {logOut, user, token, validationMap} = useContext(AuthContext);
    return (
        <View style={mapaStyle.container}>
           <Text>Mapas</Text> 
            <Button
                title="logout"
                color="#5856d6"
                onPress={logOut}
            />
            <Text>
                {JSON.stringify(user, null,5)}
                {JSON.stringify(validationMap, null,5)}
            </Text>
        </View>
    )
}
