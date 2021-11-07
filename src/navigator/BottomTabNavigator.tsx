import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapasScreen } from '../screen/MapasScreen';
import { MultasScreen } from '../screen/MultasScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottonTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          elevation: 5,
          shadowColor: 'transparent',
          backgroundColor: 'white'
        },
        
        tabBarIcon: ({ color, focused }) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Mapas':
              iconName = 'navigate-outline'
              break;
            case 'Multas':
              iconName = 'log-out-outline'
              break;
            default:
              break;
          }
          return <Text style={{ color }}><Icon name={iconName} size={25} color={color} /></Text>
        },
        tabBarLabelStyle:{
          fontSize:15,
        }
      })}

    >
      <Tab.Screen name="Mapas" component={MapasScreen} />
      <Tab.Screen name="Multas" options={{title:"Cerrar Sesion"}}  component={MultasScreen} />
    </Tab.Navigator>
  );
}