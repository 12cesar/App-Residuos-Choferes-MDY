import { StyleSheet } from "react-native";

export const mapaStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    blackButton:{
        zIndex:999,
        height:50,
        width:50,
        backgroundColor:'#0475fe',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity:0.27,
        shadowRadius:4.65,
        elevation:6
    }
});