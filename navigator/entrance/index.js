import { View,Text, ActivityIndicator, ActivityIndicatorComponent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Banner } from "../../components/globals/utils";
import { orders } from "../../components/globals/images";
import { COLORS } from "../../components/globals/theme";

const EntrancePage = ()=>{
    return(
        <SafeAreaView 
        style={{
            flex:1
        }}
        >
            
            <View 
            style={{
                justifyContent:'center',
                alignItems:'center',
                flex:1
            }}>
                <Banner avator={orders}/>
                <ActivityIndicator color={COLORS.primary} size={25}/>
            <Text style={{

            }}>
                We are setting up...
            </Text>

            </View>
        </SafeAreaView>
    )
}
export default EntrancePage