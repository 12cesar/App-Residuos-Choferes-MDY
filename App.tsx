import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native'
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigator/StackNavigator';
import socket from './src/socket/socketApi';

const AppState = ({ children }:any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  socket.emit('conectado', "hola cliente")
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>

    </NavigationContainer>
  )
}

export default App;
