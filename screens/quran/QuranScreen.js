import { View, useColorScheme, FlatList, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import QuranKurdish from '../../assets/KurdishQuranJSON/kurdish_bamok.json'
import QuranEnglish from '../../assets/KurdishQuranJSON/english_hilali_khan.json'
import QuranArabic from '../../assets/KurdishQuranJSON/ar.jalalayn.json'
import Quran from '../../assets/KurdishQuranJSON/quran.json'
import Sura from '../../assets/KurdishQuranJSON/sura.json'
import AsyncStorage from '../../storage/AsyncStorage'
import { setOpenSuraList, setOpenSuraListDialog, setReload } from '../../slices/ReloaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CheckBox, Dialog } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as MyFont from 'expo-font'
import { Audio } from 'expo-av'
const QuranScreen = () => {
    const ColorScheme = useColorScheme();
    const [QuranData, setQuranData] = useState(1)
    const [QuranDataListSelected, setQuranDataListSelected] = useState('')
    const openSuraListDialog = useSelector(state => state.ReloaderSlice.openSuraListDialog);
    const openSuraList = useSelector(state => state.ReloaderSlice.openSuraList);
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [fontLoaded, setFontLoaded] = useState(false)
    const [flatListIndex, setFlatListIndex] = useState({
        name: '',
        index: ''
    })
    const [lang, setlang] = useState('')
    const [LastTimeDialog, setLastTimeDialog] = useState(false)
    const [isPlayingAudio, setisPlayingAudio] = useState(false)
    const [ChekmarkSave, setChekmarkSave] = useState(undefined)
    const [sound, setSound] = useState()
    const [KurdishAudioQuran, setKurdishAudioQuran] = useState(false)
    const [playByIndex, setplayByIndex] = useState(undefined)
    const [IsLoading, setIsLoading] = useState(false)
    const [IsResume, setIsResume] = useState(false)
    const [OpenPlayerDialog, setOpenPlayerDialog] = useState(false)
    const [playQuranFromPosition, setPlayQuranFromPosition] = useState({
        sura: undefined,
        milliSecond: 0
    })

    useEffect(() => {
        AsyncStorage.multiGetFromStorage('SuraNow', 'SuraID').then(res => {
            if (res !== null) {
                setQuranDataListSelected(res[0][1].toString())
                setQuranData(res[1][1].toString())
                setPlayQuranFromPosition({})
            }
        })
        MyFont.loadAsync({
            'QuranFont': require('../../assets/fonts/quran.ttf'),
        }).then(() => {
            setFontLoaded(true)
        }
        )


    }, [, openSuraList])
    const isReloading = useSelector(state => state.ReloaderSlice.Reload)

    useEffect(() => {
        AsyncStorage.GetFromStorage('language').then(res => {
            if (res !== null) {
                setlang(res)
            } else {
                setlang('en')
            }
        })
        AsyncStorage.multiGetFromStorage('lastSuraReadedName', 'lastSuraReadedIndex').then(res => {
            if (res !== null) {
                setFlatListIndex({
                    name: res[0][1],
                    index: res[1][1]
                })
            }
        })
        AsyncStorage.multiGetFromStorage('KurdishQuranAudioPosition', 'KurdishQuranAudioPositionFromSura').then(res => {
            if (res !== null) {

                setPlayQuranFromPosition({
                    sura: parseInt(res[1][1]),
                    milliSecond: parseInt(res[0][1])
                })
            } else {
                setPlayQuranFromPosition(0)
            }
        })

    }, [, isReloading])

    useEffect(() => {
        const timesOut = setTimeout(() => {
            setChekmarkSave(undefined)
        }, 2000)
        return () => {
            clearTimeout(timesOut)
        }
    }, [ChekmarkSave])
    const playSound = async (surah, aya) => {
        isPlayingAudio === true && setIsLoading(true)
        KurdishAudioQuran && !isPlayingAudio && setIsResume(true)

        const { sound } = await Audio.Sound.createAsync({
            uri: KurdishAudioQuran ? `https://ia902800.us.archive.org/31/items/quraninkurdish/Saad_Al_Ghamedi_with_Kurdish_Translation_${surah}.mp3` : `https://www.everyayah.com/data/Alafasy_64kbps/${surah}${aya}.mp3`,

        });
        setSound(sound);
        if (KurdishAudioQuran && playQuranFromPosition.sura == QuranData && playQuranFromPosition.milliSecond > 110) {
            await sound.playFromPositionAsync(playQuranFromPosition.milliSecond).then(() => {
                sound._onPlaybackStatusUpdate = (status) => {
                    if (status.didJustFinish) {
                        AsyncStorage.multiRemoveFromStorage('KurdishQuranAudioPosition', 'KurdishQuranAudioPositionFromSura').then(() => {
                            setPlayQuranFromPosition({
                                sura: undefined,
                                milliSecond: 0
                            })
                        })
                        setisPlayingAudio(false)
                    }
                    if (status.isLoaded && status.isPlaying) {
                        setisPlayingAudio(true)
                        setIsLoading(false)
                        setOpenPlayerDialog(false)
                        setIsResume(false)

                    } else {
                        setIsLoading(false)
                        setisPlayingAudio(false)
                    }
                }
            })
        } else {
            surah && await sound.playAsync().then(() => {
                sound._onPlaybackStatusUpdate = (status) => {
                    if (status.didJustFinish) {
                        setisPlayingAudio(false)
                    }
                    if (status.isPlaying) {
                        setisPlayingAudio(true)
                        setIsLoading(false)
                        setIsResume(false)

                    } else {
                        setIsLoading(false)
                        setisPlayingAudio(false)
                    }

                }


            }).then(() => {
                playQuranFromPosition.milliSecond > 100 && AsyncStorage.multiRemoveFromStorage('KurdishQuranAudioPosition', 'KurdishQuranAudioPositionFromSura')

            })
        }
    }
    const playNewSound = async (surah) => {
        setIsResume && setIsResume(false)

        if (playQuranFromPosition.milliSecond > 100) {
            AsyncStorage.multiRemoveFromStorage('KurdishQuranAudioPosition', 'KurdishQuranAudioPositionFromSura').then(() => {
                dispatch(setReload(!isReloading))
            })
        }
        const { sound } = await Audio.Sound.createAsync({
            uri: `https://ia902800.us.archive.org/31/items/quraninkurdish/Saad_Al_Ghamedi_with_Kurdish_Translation_${surah}.mp3`,

        });
        setSound(sound);
        isPlayingAudio === true && setIsLoading(true)
        surah && await sound.playAsync().then(() => {
            sound._onPlaybackStatusUpdate = (status) => {
                if (status.didJustFinish) {
                    setisPlayingAudio(false)
                }
                if (status.isPlaying) {
                    setisPlayingAudio(true)
                    setIsLoading(false)
                    setOpenPlayerDialog(false)
                } else {
                    setIsLoading(false)
                    setisPlayingAudio(false)
                }

            }


        }).then(() => {
            playQuranFromPosition.milliSecond > 100 && AsyncStorage.multiRemoveFromStorage('KurdishQuranAudioPosition', 'KurdishQuranAudioPositionFromSura')

        })
    }
    const stopSound = async () => {

        KurdishAudioQuran ? await sound.getStatusAsync().then(status => {
            if (status.positionMillis > 100 && status.positionMillis < status.durationMillis) {

                AsyncStorage.multiSetToStorage('KurdishQuranAudioPosition', status.positionMillis.toString(), 'KurdishQuranAudioPositionFromSura', QuranData.toString()).then(() => {
                    sound.stopAsync().then(() => {
                        dispatch(setReload(!isReloading))
                        setisPlayingAudio(false)
                    })
                }).catch(err => {
                    return console.log(err)
                }
                )

            }
        })
            : sound.stopAsync().then(() => {
                setisPlayingAudio(false)
            }
            )



    }

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    const renderItem = ({ item, index }) => {
        return (
            <View key={item.verse} style={{
                paddingHorizontal: 10,
                paddingVertical: 25,
                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'whitesmoke',
                borderRadius: 10,
                marginHorizontal: 5,
                marginVertical: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,

            }}
            >
                <TouchableOpacity onPress={() => {
                    AsyncStorage.multiSetToStorage('lastSuraReadedName', item.chapter.toString(), 'lastSuraReadedIndex', `${item.text} (${item.verse})`).then(() => {
                        setChekmarkSave(index)
                        dispatch(setReload(!isReloading))

                    })


                }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 10,
                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : '#c1c1c195',
                        padding: 5,
                        borderRadius: 1000,
                        transform: [{ translateY: -7 }]
                    }}
                >
                    {
                        ChekmarkSave === index ?
                            <MaterialCommunityIcons name='check-bold' size={25} color={'#195f00'} />
                            :
                            <MaterialCommunityIcons name='content-save' size={25} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'black'} />
                    }
                </TouchableOpacity>
                {
                    !KurdishAudioQuran &&
                    <Button
                        onPress={() => {
                            setplayByIndex(index)
                            setIsLoading(true)
                            let surah;
                            let aya;
                            if (item.chapter.toString().length == 1) {
                                surah = '00' + item.chapter.toString()
                            }
                            else if (item.chapter.toString().length == 2) {
                                surah = '0' + item.chapter.toString()
                            }
                            else {
                                surah = item.chapter.toString()
                            }
                            if (item.verse.toString().length == 1) {
                                aya = '00' + item.verse.toString()
                            }
                            else if (item.verse.toString().length == 2) {
                                aya = '0' + item.verse.toString()
                            }
                            else {
                                aya = item.verse.toString()
                            }
                            isPlayingAudio ? stopSound() : playSound(surah, aya)






                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 0,
                            left: '13%',
                            zIndex: 10,
                            // backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : '#c1c1c195',
                            borderRadius: 1000,
                            transform: [{ translateY: -7 }],
                            overflow: 'hidden'
                        }}
                        buttonStyle={{
                            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : '#c1c1c195',
                            borderRadius: 1000,

                        }}

                        icon={
                            playByIndex === index && isPlayingAudio ?
                                <MaterialCommunityIcons name='stop' size={20} color={'#5f0000'} />
                                :
                                <MaterialCommunityIcons name='play' size={20} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'black'} />
                        }
                        loading={playByIndex === index && IsLoading}
                    />
                }

                {
                    fontLoaded &&
                    <Text style={{
                        fontSize: 25,
                        textAlign: 'right',
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'black',
                        lineHeight: 55,
                        // letterSpacing: 1,
                        fontFamily: 'QuranFont',
                    }}>{item.text}
                        &nbsp;
                        <Text style={{
                            color: 'gray',
                            fontSize: 16,
                        }}>

                            ({item.verse})
                        </Text>
                    </Text>
                }
                <Text style={{
                    fontSize: 15,
                    textAlign: lang === 'en' ? 'left' : 'right',
                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTR : 'gray',
                    lineHeight: 30,
                    letterSpacing: 1,
                    marginTop: 10,
                }}>

                    {
                        lang === 'ku' && QuranKurdish.translation_root.sura_list[item.chapter - 1].sura[item.verse].aya.translation
                    }
                    {
                        lang === 'ar' && QuranArabic.quran[item.chapter - 1].sura[item.verse].aya.text
                    }
                    {

                        lang === 'en' && QuranEnglish.translation_root.sura_list[item.chapter - 1].sura[item.verse].aya.translation
                    }


                </Text>

            </View>
        )
    }
    const renderListSura = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={.6}
                onPress={() => {
                    AsyncStorage.multiSetToStorage('SuraNow', item.name, 'SuraID', item.id.toString()).then(res => {
                        setQuranDataListSelected(item.name)
                        dispatch(setOpenSuraList(false))

                    })
                    isPlayingAudio && stopSound()


                }}
            >

                <View style={{
                    padding: 10,
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'whitesmoke',
                    borderRadius: 10,
                    margin: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                    elevation: 5,
                    borderColor: QuranDataListSelected == item.name ? '#075600ff' : 'gray',
                    borderWidth: 2,
                    opacity: QuranDataListSelected == item.name ? 1 : .3,

                }}>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'gray',
                        textAlign: 'center',

                    }}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>

            <View style={{
                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
                height: '100%',
            }}

            >

                {
                    KurdishAudioQuran &&
                    <Button
                        title={isPlayingAudio ? t('stop') : t('start')}
                        containerStyle={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 10,
                            width: '100%',
                        }}
                        buttonStyle={{
                            backgroundColor: isPlayingAudio ? '#d30000a3' : '#156f0d79',
                            borderRadius: 0,
                        }}
                        onPress={() => { !IsLoading && isPlayingAudio ? stopSound() : setOpenPlayerDialog(!OpenPlayerDialog) }}
                        loading={IsLoading}
                    />
                }

                <FlatList
                    data={Quran[QuranData]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.verse}
                    ListFooterComponent={() => { return (<View style={{ marginBottom: '30%' }}></View>) }}
                    ListHeaderComponent={() => { return (<View style={{ marginTop: '10%' }}></View>) }}


                />


            </View >
            <Dialog
                animationType='slide'
                isVisible={LastTimeDialog}
                overlayStyle={{
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
                    position: 'absolute',
                    top: '10%',
                    elevation: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: .7,
                    shadowRadius: 15,
                    borderRadius: 20,
                    overflow: 'hidden',
                    width: '90%',
                    zIndex: 1000,

                }}
                onBackdropPress={() => {
                    setLastTimeDialog(false)
                }
                }

            >


                <View style={{
                    borderBottomColor: '#9d9d9d72',
                    borderBottomWidth: 1,
                    paddingBottom: 10,

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'gray',
                        textAlign: 'center',
                    }}>
                        {t('lastSaved')}
                    </Text>
                    <MaterialCommunityIcons name="close" size={30} color="#ff0000a0" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                        onPress={() => {
                            setLastTimeDialog(!LastTimeDialog)
                        }
                        }

                    />

                </View>
                <ScrollView
                    style={{
                        maxHeight: 400,
                    }}
                >
                    {
                        fontLoaded &&
                        <View style={{
                            position: 'relative',

                        }}>

                            <Text style={{
                                fontSize: 30,
                                fontFamily: 'QuranFont',
                                color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK,
                                textAlign: 'center',
                                padding: 5,

                            }}>
                                {
                                    flatListIndex.name && Sura[flatListIndex.name - 1].name
                                }
                            </Text>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'QuranFont',
                                color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK,
                                textAlign: 'right',
                                lineHeight: 50,
                            }}>
                                {flatListIndex.index}
                            </Text>



                        </View>
                    }
                </ScrollView>


            </Dialog>
            <Dialog
                animationType='fade'
                overlayStyle={{
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
                    position: 'absolute',
                    top: '10%',
                    elevation: 15,

                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: .7,
                    shadowRadius: 15,
                    borderRadius: 20,
                    padding: 10,
                    overflow: 'hidden',
                    height: '85%',
                    width: '90%',

                }}
                isVisible={openSuraList}
                onBackdropPress={() => {
                    dispatch(setOpenSuraList(false))

                }
                }

            >
                <View style={{
                    borderBottomColor: '#9d9d9d72',
                    borderBottomWidth: 1,
                    paddingBottom: 10,

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'gray',
                        textAlign: 'center',
                    }}>
                        {t('selectSura')}
                    </Text>
                    <MaterialCommunityIcons name="close" size={30} color="#ff0000a0" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                        onPress={() => {
                            dispatch(setOpenSuraList(!openSuraList))
                        }
                        }

                    />

                </View>

                <View style={{
                    position: 'relative',

                }}>

                    {
                        <FlatList
                            data={Sura}
                            renderItem={renderListSura}
                            keyExtractor={index => index.id}
                            ListFooterComponent={() => { return (<View style={{ marginBottom: '10%' }}></View>) }}

                        />
                    }


                </View>

            </Dialog>



            <Dialog
                animationType='slide'
                overlayStyle={{
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
                    position: 'absolute',
                    top: '10%',
                    elevation: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: .7,
                    shadowRadius: 15,
                    borderRadius: 20,
                    overflow: 'hidden',
                    width: '90%',

                }}
                isVisible={openSuraListDialog}
                onBackdropPress={() => {
                    dispatch(setOpenSuraListDialog(false))


                }
                }

            >


                <View style={{
                    borderBottomColor: '#9d9d9d72',
                    borderBottomWidth: 1,
                    paddingBottom: 10,

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'gray',
                        textAlign: 'center',
                    }}>
                        {t('lastSaved')}
                    </Text>
                    <MaterialCommunityIcons name="close" size={30} color="#ff0000a0" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                        onPress={() => {
                            dispatch(setOpenSuraListDialog(!openSuraListDialog))


                        }
                        }

                    />

                </View>
                <ScrollView
                    style={{
                        maxHeight: 400,
                    }}
                >
                    <View style={{
                        marginVertical: 10,
                    }}>


                        <Button
                            title={t('Surah')}
                            containerStyle={{
                                borderRadius: 20,
                                overflow: 'hidden',
                                width: '94%',
                                marginVertical: 10,
                                left: '2.5%',

                            }}
                            buttonStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'whitesmoke',
                                borderRadius: 20,
                            }}
                            iconPosition='left'
                            titleStyle={{
                                fontSize: 20,
                                color: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'gray',

                            }}
                            icon={<MaterialCommunityIcons style={{
                                position: 'absolute',
                                left: 10,
                            }} name="format-list-text" size={20} color={ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'gray'} />}
                            onPress={() => {
                                dispatch(setOpenSuraList(!openSuraList))
                                dispatch(setOpenSuraListDialog(!openSuraListDialog))
                            }}

                        />
                        <Button
                            title={t('lastSaved')}
                            containerStyle={{
                                borderRadius: 20,
                                overflow: 'hidden',
                                width: '94%',
                                marginVertical: 10,
                                left: '2.5%',
                            }}
                            buttonStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'whitesmoke',
                                borderRadius: 20,
                            }}
                            iconPosition='left'
                            titleStyle={{
                                fontSize: 20,
                                color: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'gray',

                            }}
                            icon={<MaterialCommunityIcons style={{
                                position: 'absolute',
                                left: 10,
                            }} name="content-save-alert" size={20} color={ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'gray'} />}
                            onPress={() => {
                                dispatch(setOpenSuraListDialog(!openSuraListDialog))
                                setLastTimeDialog(!LastTimeDialog)

                            }
                            }
                        />

                        <CheckBox
                            title={t('Quran Only Arabic Sound')}
                            textStyle={{
                                color: !KurdishAudioQuran ? MyStyles.LightColor.TOX : 'gray',
                            }}
                            checked={!KurdishAudioQuran && true}
                            checkedColor={MyStyles.LightColor.TOX}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            onPress={() => {
                                setKurdishAudioQuran(false)
                                isPlayingAudio && stopSound()
                                setisPlayingAudio(false)


                            }}
                            containerStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'whitesmoke',
                                borderRadius: 20,
                                marginVertical: 10,
                            }}
                        />

                        <CheckBox
                            checked={KurdishAudioQuran && true}
                            checkedColor={MyStyles.LightColor.TOX}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            onPress={() => {
                                setKurdishAudioQuran(true)
                                isPlayingAudio && stopSound()
                                setisPlayingAudio(false)

                            }}
                            title={t('Quran & Kurdish Translation')}
                            textStyle={{
                                color: KurdishAudioQuran ? MyStyles.LightColor.TOX : 'gray',

                            }}
                            containerStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'whitesmoke',
                                borderRadius: 20,
                                marginVertical: 10,
                            }}
                        />
                    </View>
                </ScrollView>


            </Dialog>
            <Dialog
                animationType='slide'
                overlayStyle={{
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
                    position: 'absolute',
                    top: '10%',
                    elevation: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: .7,
                    shadowRadius: 15,
                    borderRadius: 20,
                    overflow: 'hidden',
                    width: '90%',

                }}
                isVisible={OpenPlayerDialog}
                onBackdropPress={() => { setOpenPlayerDialog(false) }}

            >


                <View style={{
                    borderBottomColor: '#9d9d9d72',
                    borderBottomWidth: 1,
                    paddingBottom: 10,

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'gray',
                        textAlign: 'center',
                    }}>
                        {t('KurdishQuranPlayer')}
                    </Text>
                    <MaterialCommunityIcons name="close" size={30} color="#ff0000a0" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                        onPress={() => { setOpenPlayerDialog(!setOpenPlayerDialog) }}

                    />

                </View>
                <ScrollView style={{ maxHeight: 400 }}>
                    <View style={{
                        marginVertical: 10
                    }}>

                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>

                            <Button
                                title={t('resume')}
                                containerStyle={{
                                    borderRadius: 1000,
                                    overflow: 'hidden',
                                    marginVertical: 10,
                                    height: 100,
                                    width: 100,

                                }}
                                buttonStyle={{
                                    borderRadius: 1000,
                                    height: 100,
                                    width: 100,
                                    backgroundColor: playQuranFromPosition.milliSecond > 100 ? '#ff800097' : 'gray',
                                }}
                                titleStyle={{
                                    fontSize: 13,
                                    color: 'white'
                                }}
                                onPress={() => {
                                    if (playQuranFromPosition.milliSecond > 100) {
                                        let surah;
                                        if (QuranData.toString().length == 1) {
                                            surah = '00' + QuranData.toString()
                                        }
                                        else if (QuranData.toString().length == 2) {
                                            surah = '0' + QuranData.toString()
                                        }
                                        else {
                                            surah = QuranData.toString()
                                        }
                                        playSound(surah)

                                    } else {

                                        Alert.alert(
                                            t('error'),
                                            t('ThereIsNoSavedData'),
                                            [

                                                { text: t('OK') },
                                            ],
                                            { cancelable: false },
                                        );

                                    }

                                }
                                }
                                loading={IsResume}
                            />
                            {
                                playQuranFromPosition.milliSecond > 100 &&
                                <Text style={{
                                    fontSize: 10,
                                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'gray',
                                    textAlign: lang === 'en' ? 'left' : 'right',
                                    lineHeight: 18,
                                }}>
                                    {
                                        t('resumeWarining')}                                </Text>
                            }
                            <Button
                                title={isPlayingAudio ? t('stop') : playQuranFromPosition.milliSecond > 100 ? t('new') : t('start')}
                                containerStyle={{
                                    borderRadius: 1000,
                                    overflow: 'hidden',
                                    width: 100,
                                    marginVertical: 10,
                                    height: 100,

                                }}
                                buttonStyle={{
                                    borderRadius: 1000,
                                    height: 100,
                                    width: 100,
                                    backgroundColor: isPlayingAudio ? 'red' : 'green'
                                    ,
                                }}
                                titleStyle={{
                                    fontSize: 15,
                                    color: 'white'
                                }}
                                onPress={() => {
                                    !isPlayingAudio && setIsLoading(true)
                                    let surah;
                                    if (QuranData.toString().length == 1) {
                                        surah = '00' + QuranData.toString()
                                    }
                                    else if (QuranData.toString().length == 2) {
                                        surah = '0' + QuranData.toString()
                                    }
                                    else {
                                        surah = QuranData.toString()
                                    }
                                    IsLoading === false && isPlayingAudio === false ? playNewSound(surah) : stopSound()

                                }}
                                loading={IsLoading}
                            />


                        </View>
                    </View>
                </ScrollView>


            </Dialog>

        </>
    )
}

export default QuranScreen