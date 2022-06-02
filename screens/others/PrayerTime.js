import { View, Text, ImageBackground, useColorScheme, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import sulyPrayTime from '../../assets/PrayerTimeData/sulaymaniyah.json'
import erbilPrayTime from '../../assets/PrayerTimeData/erbil.json'
import akrePrayTime from '../../assets/PrayerTimeData/akre.json'
import duhokPrayTime from '../../assets/PrayerTimeData/duhok.json'
import halabjaPrayTime from '../../assets/PrayerTimeData/halabja.json'
import jalawlaPrayTime from '../../assets/PrayerTimeData/jalawla.json'
import khanaqinPrayTime from '../../assets/PrayerTimeData/khanaqin.json'
import kirkukPrayTime from '../../assets/PrayerTimeData/kirkuk.json'
import qaraHanjirPrayTime from '../../assets/PrayerTimeData/qara_hanjir.json'
import shekhanPrayTime from '../../assets/PrayerTimeData/shekhan.json'
import taqtaqPrayTime from '../../assets/PrayerTimeData/taqtaq.json'
import tuzPrayTime from '../../assets/PrayerTimeData/tuz_khurma.json'
import zakhoPrayTime from '../../assets/PrayerTimeData/zakho.json'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import img1 from '../../assets/img/fajr.jpg'
import img2 from '../../assets/img/sunrise.jpg'
import img3 from '../../assets/img/aftermoon.jpg'
import img4 from '../../assets/img/asr.jpg'
import img5 from '../../assets/img/sunset.jpg'
import img6 from '../../assets/img/isha.jpg'
import AsyncStorage from '../../storage/AsyncStorage'
import { CheckBox, Dialog } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MyStyles } from '../../assets/styles/styles'


const PrayerTime = () => {
    const [TodayPray, setTodayPray] = useState({
        fajr: '',
        sunrise: '',
        dhuhr: '',
        asr: '',
        maghrib: '',
        isha: '',
    })
    const { t } = useTranslation()
    const Today = new Date(Date.now()).getDate().toString()
    const ThisMonth = new Date(Date.now()).getMonth() + 1
    const [ParyNowIs, setParyNowIs] = useState('')
    const [ParyNext, setParyNext] = useState('')
    const [WallpaperScreen, setWallpaperScreen] = useState('')
    const ColorScheme = useColorScheme()
    const [ShowLocationDialog, setShowLocationDialog] = useState(false)
    const [LocationUser, setLocationUser] = useState('Suleymaniyah')
    const KurdishCity = ['suly', 'erbil', 'akre', 'duhok', 'halabja', 'jalawla', 'khanaqin', 'kirkuk', 'qarahanjir', 'shekhan', 'taqtaq', 'tuz', 'zakho']
    const MapOnData = (data) => {
        data?.map(data => {

            if (data.day == Today && data.month == ThisMonth) {
                setTodayPray({
                    fajr: moment(data.time[0], 'h:mm').format('h:mm A'),
                    sunrise: moment(data.time[1], 'h:mm').format('h:mm A'),
                    dhuhr: moment(data.time[2], 'h:mm').format('h:mm A'),
                    asr: moment(data.time[3], 'h:mm').format('h:mm A'),
                    maghrib: moment(data.time[4], 'h:mm').format('h:mm A'),
                    isha: moment(data.time[5], 'h:mm').format('h:mm A'),
                })
            }
        })
    }
    const SetPrayerTimeLocationToStorage = (data) => {
        AsyncStorage.SetToStorage('PrayerTimeLocation', data).then(() => {
            setLocationUser(data)
        })
    }



    useEffect(() => {
        AsyncStorage.GetFromStorage('PrayerTimeLocation').then(res => {
            if (res !== null) {
                if (res === 'suly') {
                    MapOnData(sulyPrayTime)
                }
                if (res === 'erbil') {
                    MapOnData(erbilPrayTime)
                }
                if (res === 'akre') {
                    MapOnData(akrePrayTime)
                }
                if (res === 'duhok') {
                    MapOnData(duhokPrayTime)
                }
                if (res === 'halabja') {
                    MapOnData(halabjaPrayTime)
                }
                if (res === 'jalawla') {
                    MapOnData(jalawlaPrayTime)
                }
                if (res === 'khanaqin') {
                    MapOnData(khanaqinPrayTime)
                }
                if (res === 'kirkuk') {
                    MapOnData(kirkukPrayTime)
                }
                if (res === 'qarahanjir') {
                    MapOnData(qaraHanjirPrayTime)
                }
                if (res === 'shekhan') {
                    MapOnData(shekhanPrayTime)
                }
                if (res === 'taqtaq') {
                    MapOnData(taqtaqPrayTime)
                }
                if (res === 'tuz') {
                    MapOnData(tuzPrayTime)
                }
                if (res === 'zakho') {
                    MapOnData(zakhoPrayTime)
                }
            } else {

                AsyncStorage.SetToStorage('PrayerTimeLocation', 'suly').then(() => {
                    setLocationUser('suly')
                })
            }
            setLocationUser(res)

        })
        if (moment().format('h:mm A') >= TodayPray.fajr && moment().format('h:mm A') <= TodayPray.sunrise) {
            setParyNowIs('fajr')
            setParyNext('sunrise')
            setWallpaperScreen(img1)
        }
        if (moment().format('h:mm A') >= TodayPray.sunrise && moment().format('h:mm A') <= TodayPray.dhuhr) {
            setParyNowIs('sunrise')
            setParyNext('dhuhr')
            setWallpaperScreen(img2)
        }
        if (moment().format('h:mm A') >= TodayPray.dhuhr && moment().format('h:mm A') <= TodayPray.asr) {
            setParyNowIs('dhuhr')
            setParyNext('asr')
            setWallpaperScreen(img3)
        }
        if (moment().format('h:mm A') >= TodayPray.asr && moment().format('h:mm A') <= TodayPray.maghrib) {
            setParyNowIs('asr')
            setParyNext('maghrib')
            setWallpaperScreen(img4)
        }
        if (moment().format('h:mm A') >= TodayPray.maghrib && moment().format('h:mm A') <= TodayPray.isha) {
            setParyNowIs('maghrib')
            setParyNext('isha')
            setWallpaperScreen(img5)
        }
        if (moment().format('h:mm A') >= TodayPray.isha && moment().format('h:mm A') <= '12:01 AM') {
            setParyNowIs('isha')
            setParyNext('fajr')
            setWallpaperScreen(img6)
        }
        if (moment().format('h:mm A') >= '12:01 AM' && moment().format('h:mm A') <= TodayPray.fajr) {
            setParyNowIs('')
            setParyNext('fajr')
            setWallpaperScreen(img6)
        }


    }, [, LocationUser])







    return (

        <SafeAreaView style={{
            display: 'flex',
            alignItems: 'center',
            paddingVertical: '5%',
            height: '100%',
        }}>
            <ImageBackground source={WallpaperScreen ? WallpaperScreen : img1} style={{
                width: '110%',
                height: '110%',
                position: 'absolute',
                top: 0,
                left: 0,

            }}
                blurRadius={20}

            />
            <Pressable
                style={({ pressed }) => ({
                    backgroundColor: ColorScheme === 'dark' ? pressed ? MyStyles.DarkColor.TOX : MyStyles.DarkColor.TOXTRANS : pressed ? MyStyles.LightColor.KALTRIN : MyStyles.LightColor.KALTRINTRANS,
                    width: '80%',
                    padding: '2%',
                    borderRadius: 10,
                })}
                onPress={() => setShowLocationDialog(true)}>
                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }} >{t(`${LocationUser}`)}</Text>
                <MaterialCommunityIcons name="arrow-down-thin-circle-outline" size={20} color="white" style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    transform: [{ translateY: -3 }]

                }} />
            </Pressable>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingVertical: '5%',
                flexWrap: 'wrap',
                flexBasis: 'auto',
                flexGrow: 1,
                flexShrink: 1,
            }}>


                <ImageBackground source={require('../../assets/img/fajr.jpg')} style={{
                    width: 130,
                    height: 130,
                    overflow: 'hidden',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: ParyNowIs === 'fajr' ? '#0263008b' : ParyNext === 'fajr' && '#ff8800a3',
                    borderWidth: ParyNowIs === 'fajr' ? 2 : 0 || ParyNext === 'fajr' ? 2 : 0,
                    borderRadius: 20,
                    marginVertical: '2%',

                }}
                    blurRadius={20}

                >
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                    }}>{t('fajr')}</Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'whitesmoke',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                        opacity: 0.9,


                    }}>{TodayPray?.fajr}</Text>
                    {ParyNowIs === 'fajr' && <Text style={{ fontSize: 15, opacity: .5 }}>Now</Text>}
                    {ParyNext === 'fajr' && <Text style={{ fontSize: 15, opacity: .5 }}>Next</Text>}

                </ImageBackground>
                <ImageBackground source={require('../../assets/img/sunrise.jpg')} style={{
                    width: 130,
                    height: 130,
                    overflow: 'hidden',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: ParyNowIs === 'sunrise' ? '#0263008b' : ParyNext === 'sunrise' && '#ff8800a3',
                    borderWidth: ParyNowIs === 'sunrise' ? 2 : 0 || ParyNext === 'sunrise' ? 2 : 0,
                    borderRadius: 20,
                    marginVertical: '2%',

                }}
                    blurRadius={20}

                >
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                    }}>{t('sunrise')}</Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'whitesmoke',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                        opacity: 0.9,


                    }}>{TodayPray?.sunrise}</Text>
                    {ParyNowIs === 'sunrise' && <Text style={{ fontSize: 15, opacity: .5 }}>Now</Text>}
                    {ParyNext === 'sunrise' && <Text style={{ fontSize: 15, opacity: .5 }}>Next</Text>}
                </ImageBackground>
                <ImageBackground source={require('../../assets/img/aftermoon.jpg')} style={{
                    width: 130,
                    height: 130,
                    overflow: 'hidden',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: ParyNowIs === 'dhuhr' ? '#0263008b' : ParyNext === 'dhuhr' && '#ff8800a3',
                    borderWidth: ParyNowIs === 'dhuhr' ? 2 : 0 || ParyNext === 'dhuhr' ? 2 : 0,
                    borderRadius: 20,
                    marginVertical: '2%',



                }}
                    blurRadius={20}

                >
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                    }}>{t('dhuhr')}</Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'whitesmoke',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                        opacity: 0.9,


                    }}>{TodayPray?.dhuhr}</Text>
                    {ParyNowIs === 'dhuhr' && <Text style={{ fontSize: 15, opacity: .5 }}>Now</Text>}
                    {ParyNext === 'dhuhr' && <Text style={{ fontSize: 15, opacity: .5 }}>Next</Text>}

                </ImageBackground>
                <ImageBackground source={require('../../assets/img/asr.jpg')} style={{
                    width: 130,
                    height: 130,
                    overflow: 'hidden',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: ParyNowIs === 'asr' ? '#0263008b' : ParyNext === 'asr' && '#ff8800a3',
                    borderWidth: ParyNowIs === 'asr' ? 2 : 0 || ParyNext === 'asr' ? 2 : 0,
                    borderRadius: 20,
                    marginVertical: '2%',

                }}
                    blurRadius={20}

                >
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                    }}>{t('asr')}</Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'whitesmoke',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                        opacity: 0.9,


                    }}>{TodayPray?.asr}</Text>
                    {ParyNowIs === 'asr' && <Text style={{ fontSize: 15, opacity: .5 }}>Now</Text>}
                    {ParyNext === 'asr' && <Text style={{ fontSize: 15, opacity: .5 }}>Next</Text>}

                </ImageBackground>
                <ImageBackground source={require('../../assets/img/sunset.jpg')} style={{
                    width: 130,
                    height: 130,
                    overflow: 'hidden',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: ParyNowIs === 'maghrib' ? '#0263008b' : ParyNext === 'maghrib' && '#ff8800a3',
                    borderWidth: ParyNowIs === 'maghrib' ? 2 : 0 || ParyNext === 'maghrib' ? 2 : 0,
                    borderRadius: 20,
                    marginVertical: '2%',

                }}
                    blurRadius={20}

                >
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                    }}>{t('maghrib')}</Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'whitesmoke',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                        opacity: 0.9,


                    }}>{TodayPray?.maghrib}</Text>
                    {ParyNowIs === 'maghrib' && <Text style={{ fontSize: 15, opacity: .5 }}>Now</Text>}
                    {ParyNext === 'maghrib' && <Text style={{ fontSize: 15, opacity: .5 }}>Next</Text>}

                </ImageBackground>
                <ImageBackground source={require('../../assets/img/isha.jpg')} style={{
                    width: 130,
                    height: 130,
                    overflow: 'hidden',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderColor: ParyNowIs === 'isha' ? '#0263008b' : ParyNext === 'isha' && '#ff8800a3',
                    borderWidth: ParyNowIs === 'isha' ? 2 : 0 || ParyNext === 'isha' ? 2 : 0,
                    borderRadius: 20,
                    marginVertical: '2%',


                }}
                    blurRadius={20}

                >
                    <Text style={{
                        fontSize: 25,
                        color: 'white',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                    }}>{t('isha')}</Text>
                    <Text style={{
                        fontSize: 25,
                        color: 'whitesmoke',
                        textShadowColor: 'black',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 5,
                        opacity: 0.9,


                    }}>{TodayPray?.isha}</Text>
                    {ParyNowIs === 'isha' && <Text style={{ fontSize: 15, opacity: .5 }}>Now</Text>}
                    {ParyNext === 'isha' && <Text style={{ fontSize: 15, opacity: .5 }}>Next</Text>}

                </ImageBackground>


            </View>
            <Dialog
                backdropStyle={{
                    opacity: 0,

                }}
                overlayStyle={{
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'whitesmoke',
                    opacity: 0.96,
                    height: '70%',
                    transform: [{ translateY: -30 }],
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    elevation: 10,
                }}

                isVisible={ShowLocationDialog}
                animationType='fade'
                focusable={true}
                shouldRasterizeIOS={true}
                onBackdropPress={() => setShowLocationDialog(!ShowLocationDialog)}
            >
                <View style={{
                    borderBottomColor: '#00000049',
                    borderBottomWidth: 1,
                }}>
                    <Text style={{ marginBottom: 10, fontSize: 20, color: '#4c4c4c', textAlign: 'center' }}>
                        {t('cities')}
                    </Text>
                </View>
                <ScrollView>

                    {
                        KurdishCity?.map((city, i) => {
                            return (
                                <CheckBox
                                    key={i}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    onPress={() => {
                                        SetPrayerTimeLocationToStorage(city)

                                    }}
                                    checkedColor='gold'
                                    checked={LocationUser === city && true}
                                    title={t(city)}
                                    containerStyle={{
                                        backgroundColor: 'transparent',

                                    }}
                                    textStyle={{
                                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'gray',
                                    }}
                                />

                            )
                        })
                    }
                </ScrollView>


            </Dialog>
        </SafeAreaView>

    )
}

export default PrayerTime