import { View, useColorScheme } from 'react-native'
import React from 'react'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import SettingUI from './SettingUI';

const Setting = () => {
    const ColorScheme = useColorScheme();

    return (

        <View style={{ ...MyStyleSheet.container, height: '100%', backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : MyStyles.LightColor.KALTRIN }}>
            <SettingUI icon='language' SettingName='Lnaguage' />
            <SettingUI icon='book' SettingName='Quran Tafsir' />
            <SettingUI icon='mobile' SettingName='Wallpapers' />

        </View>
    )
}

export default Setting