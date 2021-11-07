import React, { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screen/LoadingScreen';
import { Fab } from './Fab';
import { Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import socket from '../socket/socketApi';
export const Map = () => {

    const {user, validarMap, validationMap} = useContext(AuthContext);

    let { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.01 //Very high zoom level

    const { routeLine, hasLocation, initialPosition, getCurrentLocation, followUserLocation, userLocation, stopFollowUserLocation, mostrarMarcador } = useLocation();
    const [showPolyline, setShowPolyline] = useState(true);
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true)
    useEffect(() => {
        followUserLocation();
        return () => {
            // TODO: cancelar el seguimiento
            stopFollowUserLocation
        }
    }, [])

    useEffect(() => {
        if (!following.current) return;
        const location = userLocation;
        mapViewRef.current?.animateCamera({
            center: location
        })
    }, [userLocation])
    const centerPosition = async () => {
        following.current = true
        const location = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: location
        })
    }
    useEffect(() => {
        if (validationMap) {
            socket.emit('marcador-mover', {id:user?._id,lng:userLocation.longitude, lat:userLocation.latitude});
        }
        
    }, [userLocation])
    const mostrarMarcadores = ()=>{
        validarMap();
        mostrarMarcador();
        
        
    }
    if (!hasLocation) {
        return <LoadingScreen />
    }
    
    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: LATITUDE_DELTA * (width / height),
                    longitudeDelta: 0.0421,


                }}

                zoomEnabled={true}
                scrollEnabled={true}
                showsScale={true}
                onTouchStart={() => following.current = false}
            >
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLine}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )
                }

                {/* <Marker
                        //key={index}
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        title='Esto es un titulo'
                        description='Esto es un marcador'
                    /> */}

            </MapView>
            <Fab
                iconName="compass-outline"
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />
            <Fab
                iconName="brush-outline"
                onPress={() => setShowPolyline(value => !value)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
            {
                (validationMap ===false) && (
                        <Fab
                            iconName="locate-outline"
                            onPress={mostrarMarcadores}
                            style={{
                                position: 'absolute',
                                top: 20,
                                left: 20
                            }}
                        />
                        
                    )
            }

        </>
    )
}
