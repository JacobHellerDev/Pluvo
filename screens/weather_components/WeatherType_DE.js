import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'

const openWeatherKey = '37a57a63ce85d6853e89e8f4b73e1e4e'

const WeatherType_DE = ({ navigation }) => {
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

    const descriptions = {
        // THUNDERSTORMS
        200: 'Es gibt gerade ein Gewitter und es regnet ein wenig. Es könnte laut werden!',
        201: 'Es gibt gerade ein Gewitter und es regnet. Versuchen Sie, nicht zu nass zu werden!',
        202: 'Es gibt gerade ein Gewitter und eine Menge Regen. Einem Regenschirm würde ich nicht trauen.',
        210: 'Es gibt gerade ein Gewitter. Achten Sie auf Blitze!',
        211: 'Es gibt gerade ein Gewitter. Achten Sie auf Blitze!',
        212: 'Es gibt gerade ein Gewitter. Achten Sie auf Blitze!',
        221: 'Es gibt gerade ein verrücktes Gewitter. Bleiben Sie drinnen!',
        230: 'Es gibt gerade ein Gewitter mit sehr leichtem Nieselregen. Das Gras könnte feucht werden.',
        231: 'Es gibt gerade ein Gewitter mit leichtem Nieselregen. Deine Kleidung könnte durchnässt werden.',
        232: 'Es gibt gerade ein Gewitter mit starkem Nieselregen. Bleiben Sie drinnen mit einer Decke und machen Sie heißen Kakao!',
        // DRIZZLE
        300: 'Es gibt gerade einen angenehmen, leichten Nieselregen. Die Vögel lieben es.',
        301: 'Im Moment gibt es einen mäßigen Nieselregen. Gehen Sie nach draußen und riechen Sie den Regen!',
        302: 'Draußen nieselt es gerade. Die Wolken müssen weinen.',
        310: 'Nieselregen und Regen zugleich! Oder so. Draußen ist es nass, wie wäre es damit?',
        311: 'Nieselregen und Regen zugleich! Oder so. Draußen ist es nass, wie wäre es damit?',
        312: 'Nieselregen und Regen zugleich! Oder so. Draußen ist es nass, wie wäre es damit?',
        313: 'Nieselregen und Regen zugleich! Oder so. Draußen ist es nass, wie wäre es damit?',
        314: 'Nieselregen und Regen zugleich! Oder so. Draußen ist es nass, wie wäre es damit?',
        315: 'Nieselregen und Regen zugleich! Oder so. Draußen ist es nass, wie wäre es damit?',
        // RAIN
        500: 'Es regnet leicht. Leider nicht genug zu trinken.',
        501: 'Es regnet mäßig. Planschen Sie in ein paar Pfützen!',
        502: 'Der Regen hier strömt in Strömen! Gehen Sie nach draußen, wenn Sie durchnässt werden wollen!',
        503: 'Dieser Regen ist extrem! Wenn du nach draußen gehst, wirst du völlig gesättigt sein.',
        504: 'Dieser Regen ist extrem! Wenn du nach draußen gehst, wirst du völlig gesättigt sein.',
        511: 'Es ist Schnee! Es regnet! Weder noch: Es ist eiskalter Regen!',
        520: 'Aprilschauer bringen Maiblumen! Doch auch wenn es nicht April ist, gibt es aktuell Schauer. Ich weiß nicht, was andere Duschen bringen.',
        521: 'Aprilschauer bringen Maiblumen! Doch auch wenn es nicht April ist, gibt es aktuell Schauer. Ich weiß nicht, was andere Duschen bringen.',
        522: 'Aprilschauer bringen Maiblumen! Doch auch wenn es nicht April ist, gibt es aktuell Schauer. Ich weiß nicht, was andere Duschen bringen.',
        531: 'Aprilschauer bringen Maiblumen! Doch auch wenn es nicht April ist, gibt es aktuell Schauer. Ich weiß nicht, was andere Duschen bringen.',
        // SNOW
        600: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        601: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        602: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        611: 'Draußen herrscht gerade Schneeregen. Vielleicht bleibst du drinnen und machst dir eine heiße, dampfende Tasse Tee.',
        612: 'Draußen herrscht gerade Schneeregen. Vielleicht bleibst du drinnen und machst dir eine heiße, dampfende Tasse Tee.',
        613: 'Draußen herrscht gerade Schneeregen. Vielleicht bleibst du drinnen und machst dir eine heiße, dampfende Tasse Tee.',
        615: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        616: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        620: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        621: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        622: 'Schnee! Vielleicht kannst du ja einen Schneemann bauen! Oder vielleicht auch nicht. So oder so, es schneit!',
        // ATMOSPHERE
        701: 'Draußen ist es neblig. Alles wird feucht werden, und Sie können vielleicht nicht so weit sehen.',
        711: 'Rauch! Sie sollten wahrscheinlich nicht ohne Mund-Nasen-Schutz nach draußen gehen, wenn die Luftqualität zu schlecht ist.',
        721: 'Es ist diesig. Die Sicht ist wahrscheinlich etwas eingeschränkt, also wahrscheinlich ein schlechter Tag, um etwas Landschaftliches zu tun.',
        731: 'Draußen ist es staubig. Sie sollten wahrscheinlich drinnen bleiben, um zu verhindern, dass Sie Schmutz einatmen.',
        741: 'Heute ist ein nebliger Tag. Es könnte ziemlich kühl werden, also möchtest du vielleicht ein Sweatshirt.',
        751: 'Draußen ist es sandig. Sie sollten wahrscheinlich drinnen bleiben, um zu verhindern, dass Sie Staub einatmen.',
        761: 'Draußen ist es staubig. Sie sollten wahrscheinlich drinnen bleiben, um zu verhindern, dass Sie Schmutz einatmen.',
        762: 'Es liegt Asche in der Luft. Sie sollten wahrscheinlich drinnen bleiben oder einen Mund-Nasen-Schutz tragen.',
        771: 'Beeindruckend! Draußen ist es stürmisch! Sie sollten auf jeden Fall drinnen bleiben und ein gutes Buch lesen.',
        781: 'Tornado! Überprüfen Sie die lokalen Wetterdaten, um Ihre Sicherheit zu gewährleisten und drinnen zu bleiben!',
        // CLEAR
        800: 'Nur ein klarer Himmel, sehr ruhiges Wetter für einen sehr ruhigen Tag. Viel Spaß!',
        // CLOUDS
        801: 'Nur ein paar Wolken am Himmel. Meist sonnig!',
        802: 'Nur ein paar Wolken am Himmel. Meist sonnig!',
        803: 'Meist Wolken, aber trotzdem ein bisschen Sonne!',
        804: 'Heute ist ein bewölkter Tag. Seid nicht düster, seid glücklich!'
    }

    const descriptionsEnglish = {
        // THUNDERSTORMS
        200: 'There is a thunderstorm right now and it is raining a little bit. It might get loud!',
        201: 'There is a thunderstorm right now and it is raining. Try not to get too wet!',
        202: 'There is a thunderstorm and a ton of rain right now. I would not trust an umbrella.',
        210: 'There is a thunderstorm happening right now. Watch out for lightning!',
        211: 'There is a thunderstorm happening right now. Watch out for lightning!',
        212: 'There is a thunderstorm happening right now. Watch out for lightning!',
        221: 'There is a crazy thunderstorm happening right now. Stay inside!',
        230: 'There is a thunderstorm happening with very light drizzle right now. The grass might get damp.',
        231: 'There is a thunderstorm happening with a light drizzle right now. Your clothes might get soggy.',
        232: 'There is a thunderstorm happening with a heavy drizzle right now. Stay inside with a blanket and make hot cocoa!',
        // DRIZZLE
        300: 'There is a pleasant, light drizzle happening right now. The birds are loving it.',
        301: 'There is a moderate drizzle happening right now. Go outside and smell the rain!',
        302: 'There is a serious drizzle outside right now. The clouds must be crying.',
        310: 'Drizzle and rain at the same time! Or something. It is wet outside, how about that?',
        311: 'Drizzle and rain at the same time! Or something. It is wet outside, how about that?',
        312: 'Drizzle and rain at the same time! Or something. It is wet outside, how about that?',
        313: 'Drizzle and rain at the same time! Or something. It is wet outside, how about that?',
        314: 'Drizzle and rain at the same time! Or something. It is wet outside, how about that?',
        315: 'Drizzle and rain at the same time! Or something. It is wet outside, how about that?',
        // RAIN
        500: 'It is raining lightly. Unfortunately not enough to drink.',
        501: 'It is raining moderately. Go splash around in some puddles!',
        502: 'The rain here is absolutely pouring! Go outside if you want to get soaked!',
        503: 'This rain is extreme! If you go outside, you will become completely saturated.',
        504: 'This rain is extreme! If you go outside, you will become completely saturated.',
        511: 'It is snow! It is rain! Neither: it is freezing rain!',
        520: 'April showers bring May flowers! However, even if it is not April, there are currently showers. I do not know what other showers bring.',
        521: 'April showers bring May flowers! However, even if it is not April, there are currently showers. I do not know what other showers bring.',
        522: 'April showers bring May flowers! However, even if it is not April, there are currently showers. I do not know what other showers bring.',
        531: 'April showers bring May flowers! However, even if it is not April, there are currently showers. I do not know what other showers bring.',
        // SNOW
        600: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        601: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        602: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        611: 'There is sleet outside right now. Maybe stay inside and make a hot, steamy cup of tea.',
        612: 'There is sleet outside right now. Maybe stay inside and make a hot, steamy cup of tea.',
        613: 'There is sleet outside right now. Maybe stay inside and make a hot, steamy cup of tea.',
        615: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        616: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        620: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        621: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        622: 'Snow! Maybe you can build a snowman! Or maybe not. Either way, it is snowing!',
        // ATMOSPHERE
        701: 'It is misty outside. Everything is going to become damp, and you might not be able to see that far.',
        711: 'Smoke! You probably should not go outside without a face covering if the air quality is too bad.',
        721: 'It is hazy. Visibility is probably somewhat limited, so probably a bad day to do something scenic.',
        731: 'It is dusty outside. You should probably stay indoors to prevent yourself from inhaling dirt.',
        741: 'Today is a foggy day. It could get pretty chilly, so you might want a sweatshirt.',
        751: 'It is sandy outside. You should probably stay indoors to prevent yourself from inhaling dust.',
        761: 'It is dusty outside. You should probably stay indoors to prevent yourself from inhaling dirt.',
        762: 'There is ash in the air. You should probably stay inside or wear a face covering.',
        771: 'Wow! It is stormy outside! You should definitely stay inside and read a good book.',
        781: 'Tornado! Check local weather data to ensure your safety and stay indoors!',
        // CLEAR
        800: 'Just a clear sky, very calm weather for a very calm day. Enjoy yourself!',
        // CLOUDS
        801: 'Just a few clouds in the sky. Mostly sunny!',
        802: 'Just a few clouds in the sky. Mostly sunny!',
        803: 'Mostly clouds, but still a little bit of sun!',
        804: 'Today is an overcast day. Do not be gloomy, be happy!'
    }

    const dsc = descriptions[current.id]
    const dscEnglish = descriptionsEnglish[current.id]

    return (
        <View style={styles.contentWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("WeatherGerman")}>
                <Text style={{fontSize:100}} />
                <Text style={[styles.text, {fontSize: 45}]}>{current.description}</Text>
                <Text style={[styles.text, {fontSize: 20}]}>{current.main}</Text>
                <Text />
                <Text />
                <Text />
                <View style={styles.descriptionWrapper}>
                    <Text style={[styles.text, {fontSize: 30}]}>{current.description} ist das aktuelle Wetter in {forecast.name}</Text>
                    <Text style={{fontSize:10}} />
                    <Text style={[styles.text, {fontSize: 15}]}>{current.main} is the current weather in {forecast.name}</Text>
                    <Text />
                    <Text />
                    <Text />
                    <Text style={[styles.text, {fontSize: 30}]}>{dsc}</Text>
                    <Text style={{fontSize:10}} />
                    <Text style={[styles.text, {fontSize: 15}]}>{dscEnglish}</Text>
                </View>
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
        alignItems: 'center'
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

export default WeatherType_DE