// first subcomponent from "home"

// TODO : fix bug where sometimes high and low temperature labels switch titles or locations

// in future versions we should streamline the home navigation button, as currently it feels out of place in the app

import React, { useEffect, useState } from 'react'
import { Button, View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'

const openWeatherKey = '37a57a63ce85d6853e89e8f4b73e1e4e'

const WeatherGerman = ({ navigation }) => {
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

    // main screen to render after api data is returned
    return (
        <View style={styles.wrapper}>
            <ScrollView>
                <Text style={{fontSize:10}} />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherType_DE")} >
                    <Text style={[styles.text, {fontSize: 40}]}>{current.description}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>{current.main} in {forecast.name}</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherTemp_DE")} >
                    <Text style={[styles.text, {fontSize: 50}]}>{forecast.main.temp}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>Temperatur</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherTemp_DE")} >
                    <Text style={[styles.text, {fontSize: 50}]}>{forecast.main.feels_like}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>Fühlt Sich an Wie</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherMinMax_DE")} >
                    <Text style={[styles.text, {fontSize: 50}]}>{forecast.main.temp_min}    {forecast.main.temp_max}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>   Hoch                      Niedrig</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherData_DE")} >
                    <Text style={[styles.text, {fontSize: 50}]}>{forecast.wind.speed}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>Windgeschwindigkeit</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherData_DE")} >
                    <Text style={[styles.text, {fontSize: 50}]}>{forecast.main.humidity}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>Feuchtigkeit</Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity onPress={() => navigation.navigate("WeatherData_DE")} >
                    <Text style={[styles.text, {fontSize: 50}]}>{forecast.main.pressure}</Text>
                    <Text style={[styles.text, {fontSize: 20}]}>Luftdruck</Text>
                </TouchableOpacity>
                <Text />
                <Text />
                <View style={styles.buttonWrapper}>
                    <Button title={'Home'} color={'rgb(40,40,40)'} onPress={() => navigation.navigate("HomeGerman")}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 250
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
    text: {
        color: 'white',
        fontFamily: 'serif',
        textAlign: 'center'
    },
    buttonWrapper: {
        paddingLeft: 100,
        paddingRight: 100
    }
})

export default WeatherGerman