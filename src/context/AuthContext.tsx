import React, { useEffect } from 'react'

import { createContext, useReducer } from "react";
import residuosApi from '../api/residuosApi';
import { Usuario, LoginData } from '../interfaces/login.interface';
import { AuthState, authReducer } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Keyboard, Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from 'react-native-permissions';



type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    conduccion: string | null;
    locationState: PermissionStatus;
    validationMap: boolean;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: (loginData: LoginData) => void;
    removeError: () => void;
    logOut: () => void;
    sigInPermissions: () => void;
    checkPermissions: () => void;
    validarMap: () => void;
}


const AuthInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    conduccion: null,
    locationState: 'unavailable',
    errorMessage: '',
    validationMap: false

}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {
   
    useEffect(() => {
        checkToken();
        checkPermissions();
        AppState.addEventListener('change', state => {
            if (state !== 'active') return;
            checkPermissions();
        })
    }, [])
    const checkToken = async () => {
        //console.log(state.validationMap);
        const valid = await AsyncStorage.getItem('validMap');
        if (!valid) {
            dispatch({ type: 'mapValidation', payload: false })
        }
        if(valid){
            dispatch({ type: 'mapValidation', payload: true })
        }        
        const token = await AsyncStorage.getItem('token');
        if (!token) return dispatch({ type: 'notAuthenticated' })
        // Hay token
        if (token) {
            const resp = await residuosApi.get('/auth');
            if (resp.status !== 200) {
                return dispatch({ type: 'notAuthenticated' })
            }
            return dispatch({
                type: 'signIn',
                payload: {
                    user: resp.data.user,
                    token: resp.data.token,
                    conduccion: resp.data.conduccion
                }
            })

        }

    }

    const [state, dispatch] = useReducer(authReducer, AuthInicialState);
    const signIn = async ({ usuario, password }: LoginData) => {
        try {
            const resp = await residuosApi.post('/auth/usuario', { usuario, password })
            console.log(resp);

            if (resp.data.ok) {
                dispatch({
                    type: 'signIn',
                    payload: {
                        user: resp.data.user,
                        token: resp.data.token,
                        conduccion:resp.data.conduccion
                    }
                })
                await AsyncStorage.setItem('token', resp.data.token);
            }
            if (resp.data.ok === false) {
                dispatch({
                    type: 'addError',
                    payload: resp.data.msg || 'Informacion Incorrecta'
                })
            }

        } catch (error: any) {
            console.log(error);

            dispatch({
                type: 'addError',
                payload: 'Informacion Incorrecta'
            })

        }
    }
    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    }
    const logOut = async () => {
        const tok = await AsyncStorage.getItem('token')
        if (tok) {
            await AsyncStorage.removeItem('validMap')
            await AsyncStorage.removeItem('token');
            dispatch({ type: 'logout' });
            Keyboard.dismiss();
        }
    }
    const sigInPermissions = async () => {
        let permisionsStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            //permisionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            permisionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

        } else {
            //permisionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            permisionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }
        if (permisionsStatus === 'blocked') {
            openSettings();
        }
        dispatch({ type: 'askLocationPermission', payload: permisionsStatus })
    }
    const checkPermissions = async () => {
        let permisionsStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            //permisionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            permisionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        } else {
            //permisionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            permisionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }
        dispatch({ type: 'askLocationPermission', payload: permisionsStatus })
    }
    const validarMap = async () => {
        dispatch({ type: 'mapValidation', payload: true });
        await AsyncStorage.setItem('validMap', 'ok');
    }
    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            removeError,
            logOut,
            sigInPermissions,
            checkPermissions,
            validarMap
        }}
        >
            {children}
        </AuthContext.Provider>
    )

}