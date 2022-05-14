import { View, useColorScheme, ScrollView, FlatList, Text, InteractionManager, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import QuranKurdish from '../../assets/KurdishQuranJSON/kurdish_bamok.json'
import QuranEnglish from '../../assets/KurdishQuranJSON/english_hilali_khan.json'
import QuranArabic from '../../assets/KurdishQuranJSON/ar.jalalayn.json'
import Quran from '../../assets/KurdishQuranJSON/quran.json'
import Sura from '../../assets/KurdishQuranJSON/sura.json'
import AsyncStorage from '../../storage/AsyncStorage'
import { setOpenSuraList } from '../../slices/ReloaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as MyFont from 'expo-font'
const QuranScreen = () => {
    const ColorScheme = useColorScheme();
    const [QuranData, setQuranData] = useState(1)
    const [QuranDataListSelected, setQuranDataListSelected] = useState('')
    const openSuraList = useSelector(state => state.ReloaderSlice.openSuraList);
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [fontLoaded, setFontLoaded] = useState(false)
    const [lang, setlang] = useState('')




    useEffect(() => {
        AsyncStorage.multiGetFromStorage('SuraNow', 'SuraID').then(res => {
            if (res !== null) {
                setQuranDataListSelected(res[0][1].toString())
                setQuranData(res[1][1].toString())
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
    }, [, isReloading])

    const renderItem = ({ item }) => {
        return (
            <View key={item.verse} style={{
                padding: 10,
                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'whitesmoke',
                borderRadius: 10,
                margin: 10,
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
        <View style={{
            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
        }}

        >

            <FlatList
                data={Quran[QuranData]}
                renderItem={renderItem}
                keyExtractor={(item) => item.verse}
                ListFooterComponent={() => { return (<View style={{ marginBottom: '30%' }}></View>) }}
            />
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
                            dispatch(setOpenSuraList(false))

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
        </View >

    )
}

export default QuranScreen