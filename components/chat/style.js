import { StyleSheet } from "react-native";

const chatStyles = StyleSheet.create({
    avatorBox:{
        padding:5,
        paddingRight:'5%',
        backgroundColor:'brown'
    },
    avator:{
        borderWidth:1,
        height:60,
        width:60,
        borderRadius:100,
        alignSelf:'flex-end'
    },
    avatorName:{
        marginTop:'-6%',
        color:'white',
        fontWeight:'bold'
    },
    typeBox:{
        backgroundColor:'white',
        // borderWidth:1,
        position:'absolute',
        bottom:0,
        width:'100%'
        // flex:1
    },
    input:{
        borderWidth:1,
        width:'70%',
        paddingLeft:10,
        borderRadius:8,
        borderColor:'brown'
    },
    sendButton:{
        left:'5%',
        marginLeft:15
    },
    innerBox:{
        // flex:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
        
    }
    ,sentText:{
        borderWidth:1,
        width:'60%',
        padding:'3%',
        borderRadius:15,
        alignSelf:'flex-end',
        marginTop:'4%',
        borderColor:'brown'
    },recText:{
        borderWidth:1,
        width:'60%',
        padding:'3%',
        borderRadius:15,
        alignSelf:'flex-start',
        marginTop:'4%',
        borderColor:'brown'
    }
})

export default chatStyles