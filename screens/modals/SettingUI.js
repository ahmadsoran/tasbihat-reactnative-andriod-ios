import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const SettingUI = (props) => {
    const ColorScheme = useColorScheme();

    return (
        <TouchableOpacity activeOpacity={0.5}>

            <View style={{
                ...styles.SettingView,
                backgroundColor: ColorScheme === 'dark' ? '#0b1e2f' : '#cdcdcd',

            }}>
                <FontAwesome name={props.icon} size={25} color={ColorScheme === 'dark' ? '#b7d9dd' : '#191919'} />

                <Text style={{
                    ...styles.SettingText,
                    color: ColorScheme === 'dark' ? '#b7d9dd' : '#191919',
                }}>{props.SettingName}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default SettingUI

const styles = StyleSheet.create({
    SettingView: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: '4%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginVertical: '2%',
    },
    SettingText: {
        fontSize: 18,

    }

})