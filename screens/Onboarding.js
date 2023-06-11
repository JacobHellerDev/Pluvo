import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

const Onboarding = ({ navigation }) => {
    return(
        <View style={styles.onboardingWrapper}>
            <Text style={styles.onboardingHeader}>Pluvo</Text>
            <Text style={styles.onboardingText}>Language learning through life</Text>
            <Text>{'\n\n'}</Text>
            <Button onPress={() => navigation.navigate("Login")} title={"    Log In    "} color="rgb(40,40,40)" />
            <Text>{'\n'}</Text>
            <Button onPress={() => navigation.navigate("GetStarted")} title={"    Get Started    "} color="rgb(40,40,40)" />
        </View>
    )
}

const styles = StyleSheet.create({
    onboardingWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 240,
    },
    onboardingHeader: {
        color: 'white',
        fontFamily: 'serif',
        fontSize: 70
    },
    onboardingText: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 17
    }
})

export default Onboarding