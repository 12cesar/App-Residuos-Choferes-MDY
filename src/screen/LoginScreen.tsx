import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyle } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any,any>{};

export const LoginScreen = ({navigation}:Props) => {

    const {signIn, errorMessage, removeError} = useContext(AuthContext)
    const {usuario, password, form, onChange} = useForm({
        usuario:'',
        password:''
    });
    useEffect(() => {
        if (errorMessage.length === 0)return;
        Alert.alert(
            'Login Incorrecto', 
            errorMessage,
            [
                {
                    text:'Ok',
                    onPress: removeError
                }
            ]
        
    )}, [errorMessage])
    const onlogin=()=>{
        console.log({usuario, password});
        
        signIn({usuario, password});
        Keyboard.dismiss();
    }

    return (
        <>
            {/* Background */}
            <Background />
            {/* Keyboard avoid view */}
            <KeyboardAvoidingView
                style={{
                    flex:1
                }}
            >
            <View style={loginStyle.formContainer}>
                <WhiteLogo />
                <Text style={loginStyle.title}>Login</Text>
                <Text style={loginStyle.label}>Usuario:</Text>
                <TextInput
                    placeholder="Ingrese su usuario"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    underlineColorAndroid="white"
                    style={loginStyle.inputField}
                    selectionColor="white"

                    // onchange, value
                    onChangeText={(value)=>onChange(value, 'usuario')}
                    value={usuario}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Text style={loginStyle.label}>Password:</Text>
                <TextInput
                    placeholder="******"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    underlineColorAndroid="white"
                    style={loginStyle.inputField}
                    selectionColor="white"
                    secureTextEntry={true}
                    // onchange, value
                    onChangeText={(value)=>onChange(value, 'password')}
                    value={password}
                    autoCapitalize="none"
                    autoCorrect={false}

                />

                {/* Boton login */}
                <View style={loginStyle.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={loginStyle.button}
                        onPress={onlogin}
                    >
                        <Text style={loginStyle.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
            </KeyboardAvoidingView>
        </>
    )
}
