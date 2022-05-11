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
        console.log(azkar)


    }
    const DeleteFromAzkar = async (azkar) => {
        const filtered = Azkar.indexOf(azkar)
        if (Azkar.length === 1) {
            return Alert.alert('cant delete last one')

        } else {
            if (filtered !== -1) {
                Azkar.splice(filtered, 1)
                setAzkar(Azkar)
                AsyncStorage.SetToStorage('azkar', JSON.stringify(Azkar)).then(() => {
                    dispatch(setReload(!isReloading))
                })
                console.log(Azkar)

            }
        }

    }
    const DeleteAllAzkar = () => {

        // confirm alert 
        Alert.alert(
            'حذف الكل',
            'هل تريد حذف الكل؟',
            [
                { text: 'إلغاء', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'حذف', onPress: () => {
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
                                    reset
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
                                            padding: 0,
                                            borderWidth: 0,
                                            height: '210%',
                                            width: '20%',
                                            zIndex: 10,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: 0,

                                        }}
                                        onPress={(e) => {
                                            DeleteFromAzkar(data)
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
                            <View style={{ paddingLeft: 30 }}>
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
                        <Button title={'Edit'} titleStyle={{
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
                            }}
                        />
                        <Button title={'Add'} titleStyle={{
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
                        Add Zikr
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
                            backgroundColor: 'whitesmoke'

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
                        placeholder={'Enter Zikr'}
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
                        title='Cancel'
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
                        title='Add'
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
                                Alert.alert('Please Enter Zikr')
                            }
                            else {

                                PushToAzkar(zikrInput)
                                setZikrInput('')
                            }
                        }}

                    />
                </View>

            </Dialog>
        </View >
    )
}

