import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'https://backen-api-residuos.herokuapp.com/api';


const residuosApi = axios.create({baseURL});

residuosApi.interceptors.request.use(
    async(config:any)=>{
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.token= token;
        }
        return config
    }
)

export default residuosApi;