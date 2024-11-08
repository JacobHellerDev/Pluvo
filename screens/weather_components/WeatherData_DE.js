// onclick menu for weather data

import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'

// openweatherAPI key from dev account is not secure
// TODO ! utilize end machine encrypted key in end user APK or flexible cloud API keys
const openWeatherKey = '37a57a63ce85d6853e89e8f4b73e1e4e'

const WeatherMinMax_DE = ({ navigation }) => {
    const [forecast, setForecast] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    const loadForecast = async () => {
        setRefreshing(true)
        // ask for permission to access location
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied')
        }

        // get the current location
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})

        // fetch weather data from openweathermap api
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=de&units=imperial&appid=${openWeatherKey}`)
        const data = await response.json() // convert the api response to json

        if (!response.ok) {
            Alert.alert('Error', 'Something went wrong')
        }else{
            setForecast(data)
        }
        setRefreshing(false)
    }

    // hook that runs after the component is rendered
    useEffect(() => {
        loadForecast()
    },[])

    // loading screen to render before api hook is acknowledged
    if(!forecast){
        return (
            <View style={styles.loadingWrapper}>
                <Text style={[styles.text, styles.loadingText]}>Laden</Text>
                <Text style={[styles.text, styles.loadingEnglish]}>(Loading)</Text>
                <ActivityIndicator size={65} color={'white'} />
            </View>
        )
    }

    const current = forecast.weather[0];

    return (
        <View style={styles.contentWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("WeatherGerman")}>
                    <Text style={{fontSize: 25}} />
                    <Text style={[styles.text, {fontSize: 60}]}>{forecast.wind.speed}</Text>
                    <Text style={[styles.text, {fontSize: 30}]}>ist die Windgeschwindigkeit im Moment</Text>
                    <Text />
                    <Text style={[styles.text, {fontSize: 20}]}>is the wind speed right now</Text>
                    <Text />
                    <Text />
                    <Text />
                    <Text style={[styles.text, {fontSize: 60}]}>{forecast.main.humidity}</Text>
                    <Text style={[styles.text, {fontSize: 30}]}>ist die Luftfeuchtigkeit im Moment</Text>
                    <Text />
                    <Text style={[styles.text, {fontSize: 20}]}>is the humidity right now</Text>
                    <Text />
                    <Text />
                    <Text />
                    <Text style={[styles.text, {fontSize: 60}]}>{forecast.main.pressure}</Text>
                    <Text style={[styles.text, {fontSize: 30}]}>ist der Luftdruck im Moment</Text>
                    <Text />
                    <Text style={[styles.text, {fontSize: 20}]}>is the air pressure right now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'serif',
        color: 'white',
        textAlign: 'center'
    },
    loadingText: {
        fontSize: 50,
        paddingTop: 50
    },
    loadingEnglish: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 40
    },
    contentWrapper: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    loadingWrapper: {
        paddingTop: 250,
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center'
    },
    descriptionWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40
    }
})

export default WeatherMinMax_DE
