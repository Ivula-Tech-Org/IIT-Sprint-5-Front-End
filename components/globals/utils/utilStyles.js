import { StyleSheet } from "react-native";
import { COLORS } from "../theme";
const utilStyles = StyleSheet.create({
    longButDark: {
        borderWidth: 1,
        backgroundColor: COLORS.primary,
        color: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: 40,
        borderRadius: 10
    },
    butLightText: {
        color: COLORS.light,
        fontWeight: 'bold'

    }, longButLight: {
        borderWidth: 1,
        backgroundColor: COLORS.light,
        color: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: 40,
        borderRadius: 10
    },
    butDarkText: {
        color: COLORS.primary,
        fontWeight: 'bold'

    },
    inputStyle: {
        borderWidth: 1,
        height: 35,
        width: '70%',
        borderRadius: 10
        , paddingLeft: 10,
        marginBottom: 15,
        borderColor: COLORS.primary
    },
    safeARea: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    listButtons: {
        marginTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderRadius: 10
    }
})

export default utilStyles