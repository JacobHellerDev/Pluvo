// navigation hub for end user in specified language, though there is no language specification at this time

// initial home page release with text at the bottom to inform the user of app state

// in the future this process should be streamlined

import React from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'

const HomeGerman = ({ navigation }) => {
    return (
        <View style={styles.contentWrapper}>
            <Text style={{fontSize: 220}} />
            <Text style={[styles.text, {fontSize: 60}]}>Pluvo</Text>
            <Text style={[styles.text, {fontSize: 20}]}>How would you like to learn?</Text>
            <Text />
            <Text />
            <Button onPress={() => navigation.navigate("WeatherGerman")} color='rgb(40,40,40)' title='Weather' />
            <Text style={{fontSize: 220}} />
            <Text style={[styles.text, {fontSize: 15}]}>More learning tools coming soon!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontFamily: 'serif',
        textAlign: 'center'
    }
})

export default HomeGerman