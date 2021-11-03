import { useContext, useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Location } from '../interfaces/location.interface';
import socket from '../socket/socketApi';
import { Lugar } from '../interfaces/lugar.interface';
import { AuthContext } from '../context/AuthContext';



export const useLocation = () => {

    const {user} = useContext(AuthContext)
    const [hasLocation, setHasLocation] = useState(false);
    const [routeLine, setRouteLine] = useState<Location[]>([]);
    const [initialPosition, setInitialPosition] = useState<Location>({
        longitude:0,
        latitude:0
    })
    const [userLocation, setUserLocation] = useState<Location>({
        longitude:0,
        latitude:0
    });
    const watchId = useRef<number>()
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current =true
        return () => {
            isMounted.current =false
        }
    }, [])

    useEffect(() => {

        getCurrentLocation()
                .then(location=>{
                    if (!isMounted.current) return;
                    setInitialPosition(location)
                    setUserLocation(location);
                    setRouteLine(routes=>[...routes, location])
                    setHasLocation(true);
                    
                });
        
    }, []);

    const getCurrentLocation =():Promise<Location>=>{
        return new Promise((resolve, reject)=>{
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitude:coords.latitude,
                        longitude:coords.longitude
                    });

                }, 
                (err) => reject({ err }),
                {
                    enableHighAccuracy: true
                });
        })
    }

    const followUserLocation=()=>{
        
        watchId.current = Geolocation.watchPosition( ({coords}) => {
            console.log({coords});
            const location:Location = {
                latitude:coords.latitude,
                longitude:coords.longitude
            }
            setUserLocation({
                latitude:coords.latitude,
                longitude:coords.longitude
            });
            setRouteLine(routes=>[...routes, location]);
            //socket.emit('marcador-mover', {id:user?._id,lng:location.longitude, lat:location.latitude});
        }, 
        (err) => console.log({ err }),
        {
            enableHighAccuracy: true,
            distanceFilter:10
        });

        
    }

    const stopFollowUserLocation=()=>{
        if (watchId.current) {
            Geolocation.clearWatch(watchId.current)
        }
        
    }
    
    const mostrarMarcador=()=>{
        const customMarker:Lugar={
            id: user!._id,
            lng: userLocation.longitude,
            lat: userLocation.latitude,
            nombre: user!.nombre,
            color:'#' + Math.floor(Math.random()*16777215).toString(16) 
        }
        socket.emit('marcador-nuevo',customMarker);
    }


    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLine,
        mostrarMarcador
    }
}
