import { PermissionStatus } from 'react-native-permissions';
import { Usuario } from '../interfaces/login.interface';


export interface AuthState{
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token:string | null;
    errorMessage:string;
    user:Usuario | null;
    locationState: PermissionStatus;
    validationMap:boolean
}

export type AuthAction =
                | {type: 'signIn', payload:{token:string, user:Usuario, validar:boolean}}
                | {type: 'askLocationPermission', payload: PermissionStatus}
                | {type: 'checkLocationPermission'}
                | {type: 'addError', payload:string}
                | {type: 'removeError'}
                | {type: 'notAuthenticated'}
                | {type: 'logout'}
                | {type: 'mapValidation', payload:boolean}

export const authReducer=(state: AuthState, action: AuthAction): AuthState=>{
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user:null,
                status:'not-authenticated',
                token:null,
                errorMessage:action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage:''
            }
        case 'signIn':
            return {
                ...state,
                errorMessage:'',
                status:'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                validationMap:action.payload.validar
            }
        case 'mapValidation':
            return {
                ...state,
                validationMap:action.payload
            }
        case 'askLocationPermission':
            return {
                ...state,
                locationState: action.payload
            }
        case 'checkLocationPermission':
            return {
                ...state,
                locationState:'granted'
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status:'not-authenticated',
                token: null,
                user:null,
                validationMap:false
            }
        default:
            return state;
    }
}