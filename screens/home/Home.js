import { View, Text, ImageBackground, TouchableOpacity, Vibration, useColorScheme, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import LightBG from '../../assets/img/natureLight.jpg'
import DarkBG from '../../assets/img/natureDark.jpg'
import soundRF from '../../assets/audio/penClick.mp3'
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import * as MyFont from 'expo-font'
import AsyncStorage from '../../storage/AsyncStorage'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const Home = ({ navigation }) => {
    const [ZikrNum, setZikrNum] = useState(0)
    const [ZikrNumLimit, setZikrNumLimit] = useState(100)
    const [ZikrNext, setZikrNext] = useState(0)
    const [WallpaperScreenDark, setWallpaperScreenDark] = useState(undefined)
    const [WallpaperScreenLight, setWallpaperScreenLight] = useState(undefined)
    const [ActiveBG, setActiveBg] = useState(false)
    const [AzkarFromStorage, setAzkarFromStorage] = useState([])
    const ColorScheme = useColorScheme()
    const azkar = ['سُبْحَانَ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'لا إِلَهَ إِلا اللَّهُ', 'اللَّهُ أَكْبَر']
    const [sound, setSound] = React.useState();
    const [fontLoaded, setFontLoaded] = React.useState(false);
    const isReloading = useSelector(state => state.ReloaderSlice.Reload)
    useEffect(() => {

        MyFont.loadAsync({
            'DigitalFont': require('../../assets/fonts/digital-7.ttf'),

        }).then(() => {
            setFontLoaded(true);
        });

    }, [])
    useEffect(() => {

        AsyncStorage.GetFromStorage('zikrNum').then(res => {
            if (res !== null) {
                setZikrNumLimit(res)
            } else {
                setZikrNumLimit(100)
            }
        })
        AsyncStorage.GetFromStorage('wallpaperLight').then(res => {
            if (res !== null) {
                setWallpaperScreenLight(res)
            } else {
                setWallpaperScreenLight(undefined)
            }
        })
        AsyncStorage.GetFromStorage('wallpaperDark').then(res => {
            if (res !== null) {
                setWallpaperScreenDark(res)
            } else {
                setWallpaperScreenDark(undefined)
            }
        })
        AsyncStorage.GetFromStorage('azkar').then(res => {
            if (res !== null) {
                setAzkarFromStorage(JSON.parse(res))
            } else {
                setAzkarFromStorage(azkar)
            }

        })
    }, [, isReloading])




    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(soundRF);
        setSound(sound);

        await sound.playAsync();
    }
    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    const ZikrNumHandler = () => {
        setZikrNum(ZikrNum + 1)

    }
    if (ZikrNum > ZikrNumLimit) {
        setZikrNum(0)
        setZikrNext(ZikrNext + 1)
        Vibration.vibrate(1000)

    }
    if (AzkarFromStorage.length !== 0 && ZikrNext >= AzkarFromStorage.length) {
        setZikrNext(0)


    }
    const { t } = useTranslation()
    return (
        <>
            {
                WallpaperScreenDark ?
                    <ImageBackground source={{ uri: WallpaperScreenDark }} blurRadius={20} style={{
                        width: '102%', height: '102%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: ColorScheme === 'dark' ? -1 : -2,
                        opacity: ColorScheme === 'dark' ? 1 : 0,
                    }} />
                    :
                    <ImageBackground source={DarkBG} blurRadius={20} style={{
                        width: '102%', height: '102%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: ColorScheme === 'dark' ? -1 : -2,
                        opacity: ColorScheme === 'dark' ? 1 : 0,
                    }} />
            }
            {
                WallpaperScreenLight ?
                    <ImageBackground source={{ uri: WallpaperScreenLight }} blurRadius={20} style={{
                        width: '102%', height: '102%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: ColorScheme === 'dark' ? -2 : -1,
                        opacity: ColorScheme === 'dark' ? 0 : 1,
                    }} />
                    :
                    <ImageBackground source={LightBG} blurRadius={20} style={{
                        width: '102%', height: '102%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: ColorScheme === 'dark' ? -2 : -1,
                        opacity: ColorScheme === 'dark' ? 0 : 1,
                    }} />
            }

            <SafeAreaView>
                <TouchableOpacity style={{

                    position: 'relative',
                    width: '100%',
                    paddingHorizontal: '5%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    display: 'flex',




                }}
                    onPressIn={() => navigation.navigate('Modal')}
                >
                    <View style={{
                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 1000,
                        height: 30,
                        width: 30,
                    }}>

                        <FontAwesome name="gear" size={20} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX} />
                    </View>
                </TouchableOpacity>
                <View style={MyStyleSheet.container}>
                    <View style={{ height: '100%' }}>
                        <View style={{
                            width: '100%',
                            height: '50%',
                            borderRadius: 10,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <View style={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS, borderRadius: 10, padding: 10, width: '80%', height: '80%',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                            >
                                <ScrollView>

                                    <Pressable
                                        onPressIn={() => setActiveBg(true)}
                                        onLongPress={() => {
                                            setActiveBg(false)
                                            navigation.navigate('AzkarScreen')
                                        }}
                                        onPressOut={() => setActiveBg(false)}
                                        style={{
                                            backgroundColor: ActiveBG ? '#ffffff4a' : '#ffffff00',
                                            padding: 10,
                                            borderRadius: 10,
                                        }}

                                    >

                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: AzkarFromStorage[ZikrNext]?.length > 55 ? 20 : 50,
                                            color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                                            lineHeight: AzkarFromStorage[ZikrNext]?.length > 55 ? 30 : 65,
                                        }}
                                        >
                                            {AzkarFromStorage[ZikrNext]}
                                        </Text>
                                    </Pressable>
                                </ScrollView>
                                <Text style={{ textAlign: 'center', fontSize: 40, opacity: 0.7, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX }}>{t('times')}</Text>
                                {
                                    fontLoaded ?
                                        <Text style={{ textAlign: 'center', fontSize: 65, opacity: .7, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.TOX, fontFamily: 'DigitalFont' }}>{ZikrNum}</Text>
                                        :
                                        <Text style={{ textAlign: 'center', fontSize: 65, opacity: .7, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.TOX }}>{ZikrNum}</Text>

                                }
                            </View>
                        </View>

                        <TouchableOpacity onPress={playSound} onPressIn={ZikrNumHandler} style={{
                            width: '100%',
                            height: '50%',
                            flex: 1,
                            alignItems: 'center',

                        }}>
                            <View style={{
                                borderRadius: 1000,
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS,
                                width: 120,
                                height: 120,
                                marginTop: 20,
                                overflow: 'hidden',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>



                                <Text style={{

                                    fontSize: 50,
                                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.TOX

                                }}>
                                    {ZikrNum}
                                </Text>

                            </View>
                        </TouchableOpacity>


                    </View>

                </View >
            </SafeAreaView >
        </>


    )
}

export default Home