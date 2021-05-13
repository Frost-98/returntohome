import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
    return (
        <View style={styles.container}>
            <Text>로딩중...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: "#393434"
    },
    text: {
        color: "#2c2c2c",
        fontSize: 50
    }
});