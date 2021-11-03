import React, { useContext, useState } from 'react'
import { View, Text, Button, Platform, ImageSourcePropType, SafeAreaView, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

const {height:screenHeight, width:screenWidth} =Dimensions.get('window');

interface Slide {
    title: string;
    desc: string;
    img: ImageSourcePropType
}

const items: Slide[] = [
    {
        title: 'Bienvenido',
        desc: 'Para que la aplicacion funcione correctamente es necesario tener permisos de la localicacion, da click en aceptar para poder continuar.',
        img: require('../assets/images/slide-1.png')
    }/* ,
    {
        title: 'Titulo 2',
        desc: 'Anim est quis elit proident magna quis cupidatat culpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
        img: require('../assets/images/slide-2.png')
    },
    {
        title: 'Titulo 3',
        desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
        img: require('../assets/images/slide-3.png')
    }, */
]

export const PermisoMapScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const {locationState, user, sigInPermissions} = useContext(AuthContext)
    const renderItem=(item:Slide)=>{
        return (
            <View
                style={{
                    flex:1,
                    backgroundColor:'white',
                    borderRadius:5,
                    padding:40,
                    justifyContent:'center'
                }}
            >
                <Image
                    source={{uri:'https://res.cloudinary.com/dertftoym/image/upload/v1635935538/slide-1_dpnft7.png'}}
                    style={{
                        width:350,
                        height:400,
                        resizeMode:'center'
                    }}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.desc}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex:1,
            }}
        >
            <Carousel
              //ref={(c) => { this._carousel = c; }}
              data={items}
              renderItem={({item})=>renderItem(item)}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              layout="default"
              onSnapToItem={(index)=>{
                setActiveIndex(index)
              }}
            />
            <View style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                marginHorizontal:20,
                alignItems:'center',
                marginBottom:40
            }}>
            {/* <Pagination
                dotsLength={items.length}
                activeDotIndex={activeIndex}
                dotStyle={{
                    width:20,
                    height:5,
                    borderRadius:10,
                    backgroundColor:'#5856d6'
                }}
            /> */}
            <TouchableOpacity
                style={{
                    flexDirection:'row',
                    backgroundColor:'#5856d6',
                    width:140,
                    height:50,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                onPress={sigInPermissions}
            >
                <Text style={{
                    fontSize:20,
                    color:'white',
                    marginBottom:5,
                    marginRight:5
                }}>Aceptar</Text>
                <Icon
                    name="paper-plane-outline"
                    color="white"
                    size={30}
                />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#5856d6'
    },
    subtitle:{
        fontSize:16
    }
});
