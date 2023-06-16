// simple text and navigation page to display app info to end user

// fully static text display, modify text elements

import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

const GetStarted = ({ navigation }) => {
    return (
        <View style={styles.getStartedWrapper}>
            <Text style={styles.getStartedHeader}>Welcome to Pluvo</Text>
            <Text />
            <Text style={styles.getStartedText}>Pluvo means 'rain' in Esperanto</Text>
            <Text />
            <Text style={styles.getStartedText}>Pluvo is a language learning app that presents you with real-world uses for your new language!</Text>
            <Text />
            <Text style={styles.getStartedText}>Every day you use Pluvo, you learn new words and strengthen association with real-world concepts. This helps you learn faster and retain information without constantly practicing.</Text>
            <Text />
            <Text />
            <Button onPress={() => navigation.navigate("CreateAccount")} title={"    Let's go    "} color="rgb(40,40,40)" />
        </View>
    )
}

const styles = StyleSheet.create({
    getStartedWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 200,
    },
    getStartedHeader: {
        color: 'white',
        fontFamily: 'serif',
        fontSize: 40
    },
    getStartedText: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 17,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    }
})

export default GetStarted