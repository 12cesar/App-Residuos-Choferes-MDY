import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MapasScreen } from '../screen/MapasScreen';
import { MultasScreen } from '../screen/MultasScreen';

const Tab = createMaterialBottomTabNavigator();

export const MaterialNavigator=()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mapas" component={MapasScreen} />
      <Tab.Screen name="Multas" component={MultasScreen} />
    </Tab.Navigator>
  );
}
