import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screen/LoginScreen';
import { PrivateScreen } from '../screen/PrivateScreen';
import { MaterialNavigator } from './MaterialBottonNavigator';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screen/LoadingScreen';
import { PermisoMapScreen } from '../screen/PermisoMapScreen';
import { BottonTabNavigator } from './BottomTabNavigator';

const Stack = createStackNavigator();

export const StackNavigator=() =>{

  const {status, locationState} =useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen/>

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
            cardStyle:{
                backgroundColor:'white'
            }
        }}
    >
      {
        (status !== 'authenticated')
          ? (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          )
          : (
            <>
             {
               (locationState !== 'granted')
                  ? <Stack.Screen name="PermisoMapScreen" component={PermisoMapScreen} />
                  : <Stack.Screen name="MaterialNavigator" component={BottonTabNavigator} />
             }
            </>
          )
      }

      
      
    </Stack.Navigator>
  );
}