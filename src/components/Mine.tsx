import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {

}


export default (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.coreMine} />
            <View style={styles.line} />
            <View style={[styles.line, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.line, { transform: [{ rotate: '90deg' }] }]} />
            <View style={[styles.line, { transform: [{ rotate: '135deg' }] }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    coreMine: {
        height: 14,
        width: 14,
        borderRadius: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    line: {
        position: 'absolute',
        height: 3,
        width: 3,
        borderRadius: 3,
        backgroundColor: '#000'
    }
})