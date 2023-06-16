// returning user app settings specification page

// in future versions this will be replaced with async accounts and a settings page

import React from 'react'
import { Text, TextInput, Button, View, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

const CreateAccount = ({ navigation }) => {
    
    const [selected, setSelected] = React.useState([])

    const LANGS = [
        {key:'1', value:'🇩🇪    German'}
    ]

    const submit = () => {
        if (selected == "🇩🇪    German") {
            navigation.navigate("HomeGerman")
        }
    }

    return (
        <View style={styles.createAccountWrapper}>
            <Text style={styles.createAccountHeader}>Welcome Back!</Text>
            <Text />
            <Text style={styles.createAccountTagline}>Use Pluvo every day to build strong word associations</Text>
            <Text />
            <Text />
            <Text style={styles.createAccountText}>What language are you learning?</Text>
            <Text />
            <Text />
            <SelectList label="Languages" save="value" data={LANGS} setSelected={setSelected} boxStyles={{backgroundColor: 'rgb(170,170,170)', width: 150}} search={false} maxHeight={60} dropdownStyles={{backgroundColor:'black'}} dropdownTextStyles={{color:'white'}} placeholder={"Select language!  "} />
            <Text>{'\n'}</Text>
            <Button onPress={submit} color={'rgb(40,40,40)'} title=" Perfect! " />
        </View>
    )
}

const styles = StyleSheet.create({
    createAccountWrapper: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 240
    },
    createAccountHeader: {
        color: 'white',
        fontFamily: 'serif',
        fontSize: 40
    },
    createAccountText: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 17,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    createAccountTagline: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 14,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    textInput: {
        height: 55,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 10,
        margin: 4,
        borderRadius: 20
    }
})

export default CreateAccount