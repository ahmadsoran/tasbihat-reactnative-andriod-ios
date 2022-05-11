import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles } from '../../assets/styles/styles'
import AsyncStorage from '../../storage/AsyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { BottomSheet, Button } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setOpenBottomSheet, setReload } from '../../slices/ReloaderSlice'
export default function AzkarScreen() {
    const azkar = ['سُبْحَانَ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'لا إِلَهَ إِلا اللَّهُ', 'اللَّهُ أَكْبَر']
    const [Azkar, setAzkar] = useState([])
    const [AzkarFilterd, setAzkarFilterd] = useState([])
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

        if (filtered !== -1) {
            Azkar.splice(filtered, 1)
            setAzkar(Azkar)
            AsyncStorage.SetToStorage('azkar', JSON.stringify(Azkar)).then(() => {
                dispatch(setReload(!isReloading))
            })
            console.log(Azkar)

        }

    }
    const DeleteAllAzkar = () => {
        setAzkar(azkar)
        AsyncStorage.RemoveFromStorage('azkar', JSON.stringify(Azkar))
        dispatch(setReload(!isReloading))
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


                            onPress={(e) => {
                                PushToAzkar(i++)
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
        </View >
    )
}

