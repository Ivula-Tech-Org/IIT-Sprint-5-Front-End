import { StyleSheet } from "react-native";

const locStyles = StyleSheet.create({
    container:{
        height:'49%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15
        // ,elevation:-20
        ,shadowOffset:{
            width:0,
            height:0
        },
        shadowRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'-5%',
        borderWidth:1
        ,backgroundColor:'white'
    }
})

export default locStyles