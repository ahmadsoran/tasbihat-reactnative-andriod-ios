import { View, Text, ImageBackground, useColorScheme, SafeAreaView, Pressable, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import KUprayer from 'kurdistan-prayer-times'
import * as Notifications from 'expo-notifications'
import { requestPermissionsAsync } from '../../Permissions'
requestPermissionsAsync()

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


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
    const [ParyNowIs, setParyNowIs] = useState('')
    const [ParyNext, setParyNext] = useState('')
    const [WallpaperScreen, setWallpaperScreen] = useState('')
    const ColorScheme = useColorScheme()
    const [ShowLocationDialog, setShowLocationDialog] = useState(false)
    const [LocationUser, setLocationUser] = useState('sulaymaniyah')
    const KurdishCity = [
        'sulaymaniyah',
        'erbil',
        'kirkuk',
        'taqtaq',
        'akre',
        'duhok',
        'halabja',
        'jalawla',
        'khanaqin',
        'qaraHanjir',
        'shekhan',
        'tuzKhurma',
        'zakhoo'

    ]
    const { res } = KUprayer(LocationUser).format(12).date('Today')
    const { res: res2 } = KUprayer(LocationUser).format(24).date('Today')
    const SetPrayerTimeLocationToStorage = (data) => {
        AsyncStorage.SetToStorage('PrayerTimeLocation', data).then(() => {
            setLocationUser(data)
        })
    }
    const now = new Date(Date.now()).getHours()
    const PT = {
        fajr: res.TodayPrayer.Fajr,
        sunrise: res.TodayPrayer.Sunrise,
        dhuhr: res.TodayPrayer.Dhuhr,
        asr: res.TodayPrayer.Asr,
        maghrib: res.TodayPrayer.Maghrib,
        isha: res.TodayPrayer.Isha,
    }
    const PT2 = {
        fajr: res2.TodayPrayer.Fajr,
        sunrise: res2.TodayPrayer.Sunrise,
        dhuhr: res2.TodayPrayer.Dhuhr,
        asr: res2.TodayPrayer.Asr,
        maghrib: res2.TodayPrayer.Maghrib,
        isha: res2.TodayPrayer.Isha,
    }
    const RPT = [
        PT2.fajr,
        PT2.sunrise,
        PT2.dhuhr,
        PT2.asr,
        PT2.maghrib,
        PT2.isha
    ]
    const filterTimeFajr = parseInt(RPT[0].split(':')[0])
    const filterTimeSunrisw = parseInt(RPT[1].split(':')[0])
    const filterTimeDhuhr = parseInt(RPT[2].split(':')[0])
    const filterTimeAsr = parseInt(RPT[3].split(':')[0])
    const filterTimeMaghrib = parseInt(RPT[4].split(':')[0])
    const filterTimeIsha = parseInt(RPT[5].split(':')[0])


    useEffect(() => {
        AsyncStorage.GetFromStorage('PrayerTimeLocation').then((data) => {
            if (data) {
                setLocationUser(data)
            }
        })
        setTodayPray(PT)
        if (now >= filterTimeFajr && now < filterTimeSunrisw) {
            setParyNowIs('fajr')
            setParyNext('sunrise')
            setWallpaperScreen(img1)

        }
        if (now >= filterTimeSunrisw && now < filterTimeDhuhr) {
            setParyNowIs('sunrise')
            setParyNext('dhuhr')
            setWallpaperScreen(img2)

        }
        if (now >= filterTimeDhuhr && now < filterTimeAsr) {
            setParyNowIs('dhuhr')
            setParyNext('asr')
            setWallpaperScreen(img3)
        }
        if (now >= filterTimeAsr && now < filterTimeMaghrib) {
            setParyNowIs('asr')
            setParyNext('maghrib')
            setWallpaperScreen(img4)
        }
        if (now >= filterTimeMaghrib && now < filterTimeIsha) {
            setParyNowIs('maghrib')
            setParyNext('isha')
            setWallpaperScreen(img5)
        }
        if (now >= filterTimeIsha && now < filterTimeIsha + 1) {
            setParyNowIs('isha')
            setParyNext('fajr')
            setWallpaperScreen(img6)
        }
        if (now >= filterTimeIsha + 1) {
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