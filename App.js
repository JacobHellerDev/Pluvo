// !!! END USER MACHINE PLUVO APK !!!
// FINAL DISTRIBUTION MODEL, PLEASE BE MINDFUL OF CHANGES MADE DIRECTLY TO MAIN BRANCH
// MAIN BRANCH MODIFICATIONS SHOULD BE MODIFIED TO A FORKED COMMIT AND PULL REQUEST
// DO NOT FORK MAIN WITHOUT MAKING A PULL REQUEST  !!!

// --> app.js executes on runtime at launch
// main navigation system imports and execution

// this is static code which renders no components

import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Onboarding from './screens/Onboarding.js'
import GetStarted from './screens/GetStarted.js'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './screens/CreateAccount.js'
import Login from './screens/Login.js'
import WeatherGerman from './screens/WeatherGerman.js'
import HomeGerman from './screens/HomeGerman.js'

// GERMAN weather screen imports, _DE suffix only
import WeatherType_DE from './screens/weather_components/WeatherType_DE.js'
import WeatherTemp_DE from './screens/weather_components/WeatherTemp_DE.js'
import WeatherMinMax_DE from './screens/weather_components/WeatherMinMax_DE.js'
import WeatherData_DE from './screens/weather_components/WeatherData_DE.js'

// Initialize React Native Stack Navigator as object of class
const Stack = createNativeStackNavigator()

// Return main app JSX as function Pluvo

const Pluvo = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <NavigationContainer theme={{ colors: { background: '#000' } }}>
        <StatusBar style='inverted' />
        <Stack.Navigator screenOptions={{headerShown: false }}>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="WeatherGerman"
            component={WeatherGerman}
          />
          <Stack.Screen
            name="HomeGerman"
            component={HomeGerman}
          />

          <Stack.Screen name="WeatherType_DE" component={WeatherType_DE} />
          <Stack.Screen name="WeatherTemp_DE" component={WeatherTemp_DE} />
          <Stack.Screen name="WeatherMinMax_DE" component={WeatherMinMax_DE} />
          <Stack.Screen name="WeatherData_DE" component={WeatherData_DE} />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

// TODO !
// test function to render individual components in dev environment
// should not be included in final package, possibly add an import and flag variable for this function for devs
// could also put the entire app function inside a package with a flag var for what jsx component to render

// --> active test component is in final end machine APK
// utilize by export default Test

const Test = () => {
  return (
    <Text />
  )
}

export default Pluvo
