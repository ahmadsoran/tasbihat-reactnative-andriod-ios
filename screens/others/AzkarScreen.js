import {
    Alert, Keyboard, ScrollView, Text, TextInput,
    TouchableOpacity, useColorScheme, View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles } from '../../assets/styles/styles'
import AsyncStorage from '../../storage/AsyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { BottomSheet, Button, Dialog } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setOpenBottomSheet, setReload } from '../../slices/ReloaderSlice'
import MorningAzkar from '../../assets/AzkarData/MorningAzkar.json'
import { useTranslation } from 'react-i18next'
export default function AzkarScreen() {
    const azkar = ['سُبْحَانَ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'لا إِلَهَ إِلا اللَّهُ', 'اللَّهُ أَكْبَر']
    const [Azkar, setAzkar] = useState([])
    const [zikrInput, setZikrInput] = useState('')
    const ColorScheme = useColorScheme()
    const dispatch = useDispatch()
    const isReloading = useSelector(state => state.ReloaderSlice.Reload)
    const openBottomSheet = useSelector(state => state.ReloaderSlice.openBottomSheet)
    const [IsEditMode, setIsEditMode] = useState(false)
    const [IsAddMode, setIsAddMode] = useState(false)
    const [FindZikr, setFindZikr] = useState(false)
    useEffect(() => {
        AsyncStorage.GetFromStorage('azkar').then(res => {
            if (res !== null) {
                setAzkar(JSON.parse(res))
            } else {
                setAzkar(azkar)
                AsyncStorage.SetToStorage('azkar', JSON.stringify(azkar))
            }
        })
    }, [, isReloading])
    const PushToAzkar = (azkar) => {
        Azkar.push(azkar)
        AsyncStorage.SetToStorage('azkar', JSON.stringify(Azkar)).then(() => {
            dispatch(setReload(!isReloading))
        })


    }
    const DeleteFromAzkar = async (azkar) => {
        const filtered = Azkar.indexOf(azkar)
        if (Azkar.length === 1) {
            return Alert.alert(t('cantDeleteLastZikr'))

        } else {
            if (filtered !== -1) {
                Azkar.splice(filtered, 1)
                setAzkar(Azkar)
                AsyncStorage.SetToStorage('azkar', JSON.stringify(Azkar)).then(() => {
                    dispatch(setReload(!isReloading))
                })

            }
        }

    }
    const { t } = useTranslation()
    const DeleteAllAzkar = () => {

        // confirm alert 
        Alert.alert(
            t('resetToDefault'),
            t('doYouWantToReset'),
            [
                { text: t('no'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: t('yes'), onPress: () => {
                        setAzkar(azkar)
                        AsyncStorage.RemoveFromStorage('azkar', JSON.stringify(Azkar))
                        dispatch(setReload(!isReloading))
                    }
                },
            ],
            { cancelable: true }
        )


    }


    return (
        <View style={{
            padding: '3%',
            height: '100%',
            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'whitesmoke',
        }}>
            <ScrollView bounces={true} fadingEdgeLength={20} >
                {
                    IsEditMode && (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}>

                            <TouchableOpacity style={{

                                borderRadius: 1000,
                                overflow: 'hidden',

                            }} onPress={DeleteAllAzkar}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    position: 'relative',
                                    textAlign: 'right',
                                    backgroundColor: 'red',
                                    borderRadius: 1000,
                                    paddingHorizontal: '2%',
                                    paddingVertical: '1%',

                                }}>
                                    {t('reset')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                {Azkar && Azkar?.map((data, i) => {
                    return (

                        <TouchableOpacity
                            key={i}
                            style={{
                                padding: 15,
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                                borderRadius: 10,
                                marginVertical: '2%',
                                position: 'relative',
                                overflow: 'hidden',

                            }}
                            activeOpacity={0.7}
                            onLongPress={() => {
                                setIsEditMode(!IsEditMode)
                            }}


                        >
                            {
                                IsEditMode && (

                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            padding: 10,
                                            borderWidth: 0,
                                            height: '210%',
                                            width: '15%',
                                            zIndex: 10,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            transform: [{ translateY: -10 }],



                                        }}
                                        onPress={(e) => {
                                            Alert.alert(
                                                t('delete'),
                                                `${data}`,
                                                [
                                                    { text: t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                                    { text: t('delete'), onPress: () => { DeleteFromAzkar(data) } },
                                                ],
                                                { cancelable: true }
                                            )
                                        }}
                                    >
                                        <MaterialCommunityIcons name="close" size={30} color="red" />
                                    </TouchableOpacity>
                                )}

                            <Text style={{
                                fontSize: 20,
                                color: 'gray',
                                position: 'absolute',
                                top: '50%',
                                left: '5%',
                            }}>{i + 1}</Text>
                            <View style={{ paddingHorizontal: 30 }}>
                                <Text testID='text' style={{
                                    width: '100%',

                                    textAlign: 'center', fontSize: 20, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK
                                }}>
                                    {data}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
            {
                openBottomSheet && (
                    <View style={{
                        position: 'absolute',
                        top: 5,
                        right: 20,
                        zIndex: 10,
                        padding: 10,
                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.KAL,
                        borderRadius: 10,
                        overflow: 'hidden',
                        elevation: 15,

                    }}>
                        <Button title={t('edit')} titleStyle={{
                            color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK,
                            fontSize: 15,

                        }}
                            containerStyle={{
                                width: 70,
                                marginVertical: 5,
                                borderRadius: 1000,
                                overflow: 'hidden',
                            }}
                            buttonStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS,
                                borderRadius: 1000,
                            }}
                            onPress={() => {
                                dispatch(setOpenBottomSheet(!openBottomSheet))
                                setIsEditMode(!IsEditMode)
                                setIsAddMode(false)
                                setFindZikr(false)

                            }}
                        />
                        <Button title={t('add')} titleStyle={{
                            color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK,
                            fontSize: 15,

                        }}
                            containerStyle={{
                                width: 70,
                                marginVertical: 5,
                                borderRadius: 1000,
                                overflow: 'hidden',
                            }}
                            buttonStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS,
                                borderRadius: 1000,

                            }}
                            onPress={() => {
                                dispatch(setOpenBottomSheet(!openBottomSheet))
                                setIsAddMode(!IsAddMode)
                                setIsEditMode(false)
                                setFindZikr(false)

                            }}
                        />
                        <Button title={t('find')} titleStyle={{
                            color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK,
                            fontSize: 15,

                        }}
                            containerStyle={{
                                width: 70,
                                marginVertical: 5,
                                borderRadius: 1000,
                                overflow: 'hidden',
                            }}
                            buttonStyle={{
                                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS,
                                borderRadius: 1000,

                            }}
                            onPress={() => {
                                dispatch(setOpenBottomSheet(!openBottomSheet))
                                setFindZikr(!FindZikr)
                                setIsAddMode(false)
                                setIsEditMode(false)
                            }}
                        />

                    </View>
                )
            }
            <Dialog
                animationType='fade'
                overlayStyle={{
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'white',
                    position: 'absolute',
                    top: '25%',
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

                }}
                isVisible={IsAddMode}
                onBackdropPress={() => {
                    // dismiss keyboard
                    Keyboard.dismiss()
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
                        {t('addZikr')}
                    </Text>
                    <MaterialCommunityIcons name="close" size={30} color="#ff0000a0" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                        onPress={() => {
                            setIsAddMode(false)

                        }
                        }
                        android_hyphenationFrequency="normal"

                    />

                </View>
                <View style={{
                    position: 'relative',
                    maxHeight: '60%',

                }}>
                    <TextInput
                        style={{
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#9d9d9d',
                            padding: 10,
                            marginVertical: 10,
                            fontSize: 20,
                            color: 'gray',
                            textAlign: 'center',
                            backgroundColor: 'whitesmoke',
                            height: 200,

                        }}
                        onChangeText={(text) => {
                            setZikrInput(text)
                        }
                        }
                        value={zikrInput}
                        multiline={true}
                        scrollEnabled={true}
                        keyboardAppearance={ColorScheme === 'dark' ? 'dark' : 'light'}
                        spellCheck={false}
                        autoCorrect={false}
                        placeholder={t('enterZikr')}
                        blurOnSubmit={true}
                        numberOfLines={5}
                        textBreakStrategy={'simple'}




                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}>
                    <Button
                        title={t('cancel')}
                        containerStyle={{
                            borderRadius: 1000,
                            overflow: 'hidden',
                            width: '40%',

                        }}
                        buttonStyle={{
                            backgroundColor: '#ff0000b4',
                            borderRadius: 1000,


                        }}
                        onPress={() => {
                            setZikrInput('')
                            setIsAddMode(false)
                        }}
                    />
                    <Button
                        title={t('add')}
                        containerStyle={{
                            borderRadius: 1000,
                            overflow: 'hidden',
                            width: '40%',

                        }}
                        buttonStyle={{
                            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.KAL,
                            borderRadius: 1000,

                        }}
                        onPress={() => {
                            if (!zikrInput.length > 0) {
                                Alert.alert(t('pleaseEnterZikr'))
                            }
                            else {

                                PushToAzkar(zikrInput)
                                setZikrInput('')
                            }
                        }}

                    />
                </View>

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
                isVisible={FindZikr}
                onBackdropPress={() => {
                    setFindZikr(false)
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
                        {t('addZikr')}
                    </Text>
                    <MaterialCommunityIcons name="close" size={30} color="#ff0000a0" style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                        onPress={() => {
                            setFindZikr(false)

                        }
                        }

                    />

                </View>
                <ScrollView>

                    <View style={{
                        position: 'relative',

                    }}>


                        {
                            MorningAzkar?.map((data, i) => {

                                return (
                                    <View key={i} style={{
                                        marginVertical: 10,
                                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'whitesmoke',
                                        padding: 10,
                                        borderRadius: 10,
                                        shadowColor: '#000',
                                        shadowOpacity: 0.8,
                                        shadowRadius: 6,
                                        shadowOffset: {
                                            height: 1,
                                            width: 0
                                        },
                                        elevation: 6,
                                        marginHorizontal: 10,



                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (Azkar.includes(data.Text)) {
                                                    Alert.alert(t('alreadyAdded'))
                                                } else {
                                                    Alert.alert(
                                                        t('addZikr'),
                                                        data.Text,
                                                        [
                                                            {
                                                                text: t('cancel'), onPress: () => { },
                                                                style: 'cancel'

                                                            },

                                                            {
                                                                text: t('add'), onPress: () => {
                                                                    PushToAzkar(data.Text)
                                                                },
                                                            },
                                                        ],
                                                        { cancelable: true },

                                                    )


                                                }

                                            }

                                            }
                                        >

                                            <Text style={{
                                                textAlign: 'right',
                                                color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK,
                                            }}>
                                                {data?.Text}
                                            </Text>
                                        </TouchableOpacity>
                                        {
                                            data.description !== "" && (
                                                <View style={{
                                                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : 'white',
                                                    padding: 10,
                                                    borderRadius: 10,
                                                    marginTop: 10,
                                                }}>

                                                    <Text style={{
                                                        textAlign: 'center',
                                                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : 'gray',

                                                    }}>
                                                        {data?.description}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </View>

                                )
                            })
                        }

                    </View>
                </ScrollView>

            </Dialog>
        </View >
    )
}

