import { View, Text, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles } from '../../assets/styles/styles';
import DRKBG from '../../assets/img/natureDark.jpg'
import LGHTBG from '../../assets/img/natureLight.jpg'
import AsyncStorage from '../../storage/AsyncStorage';
import { Button, Image, Slider } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { setReload } from '../../slices/ReloaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const WallpaperScreen = () => {
    const ColorScheme = useColorScheme();
    const [WallpaperDark, setWallpaperDark] = useState('')
    const [WallpaperLight, setWallpaperLight] = useState('')
    const [wallBlurDark, setWallBlurDark] = useState(20)
    const [wallBlurLight, setWallBlurLight] = useState(20)
    const { t } = useTranslation()
    const [loading, setLoading] = useState({
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
    })
    const dispatch = useDispatch();
    const isReloading = useSelector(state => state.ReloaderSlice.Reload)
    useEffect(() => {
        AsyncStorage.GetFromStorage('wallpaperDark').then(res => {
            if (res !== null) {
                setWallpaperDark(res)

            } else {
                setWallpaperDark(undefined)

            }
        })
        AsyncStorage.GetFromStorage('wallpaperLight').then(res => {
            if (res !== null) {
                setWallpaperLight(res)

            } else {
                setWallpaperLight(undefined)


            }
        })
        AsyncStorage.GetFromStorage('wallBlurLight').then(res => {
            if (res !== null) {
                setWallBlurLight(parseInt(res))

            }
        })
        AsyncStorage.GetFromStorage('wallBlurDark').then(res => {
            if (res !== null) {
                setWallBlurDark(parseInt(res))

            }
        })
    }, [])
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });


        if (!result.cancelled) {
            setLoading({ ...loading, btn1: true })
            AsyncStorage.SetToStorage('wallpaperDark', result.uri).then(() => {
                setWallpaperDark(result.uri)
                setLoading({ ...loading, btn1: false })
                dispatch(setReload(!isReloading))

            })
        }
    };
    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });


        if (!result.cancelled) {
            setLoading({ ...loading, btn3: true })
            AsyncStorage.SetToStorage('wallpaperLight', result.uri).then(() => {
                setWallpaperLight(result.uri)
                setLoading({ ...loading, btn3: false })
                dispatch(setReload(!isReloading))
            })
        }

    };
    const removeWallpaperFromStorage = () => {
        setLoading({ ...loading, btn2: true })

        AsyncStorage.RemoveFromStorage('wallpaperDark').then(() => {
            setWallpaperDark(undefined)
            dispatch(setReload(!isReloading))
            setLoading({ ...loading, btn2: false })

        }
        )
    }
    const removeWallpaperFromStorage2 = () => {
        setLoading({ ...loading, btn4: true })
        AsyncStorage.RemoveFromStorage('wallpaperLight').then(() => {
            setWallpaperLight(undefined)
            dispatch(setReload(!isReloading))

            setLoading({ ...loading, btn4: false })

        }
        )
    }
    const setWallBlurToStorageDark = (valueDark) => {
        AsyncStorage.SetToStorage('wallBlurDark', valueDark).then(() => {
            dispatch(setReload(!isReloading))
        }).catch(err => console.log(err))

    }
    const setWallBlurToStorageLight = (valueLight) => {
        AsyncStorage.SetToStorage('wallBlurLight', valueLight).then(() => {
            dispatch(setReload(!isReloading))
        }).catch(err => console.log(err))

    }

    return (
        <View style={{
            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'whitesmoke',
            height: '100%',
            paddingHorizontal: '5%',
            paddingVertical: '2%',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{ padding: '2%', width: '50%' }}>

                    <Image source={WallpaperDark ? { uri: WallpaperDark } : DRKBG}
                        fadeDuration={400}
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 20,
                        }}
                        PlaceholderContent={<Text>Loading...</Text>}
                        blurRadius={wallBlurDark}

                    />

                    <Button title={t('change')}
                        containerStyle={{
                            marginTop: '6%',
                            width: '100%',
                            borderRadius: 1000,
                            overflow: 'hidden',
                        }}
                        buttonStyle={{
                            borderRadius: 1000,
                            backgroundColor: MyStyles.DarkColor.KAL,

                        }}
                        onPress={pickImage}
                        loading={loading.btn1}
                    />
                    <Button title={t('reset')}
                        containerStyle={{
                            marginTop: '6%',
                            width: '100%',
                            borderRadius: 1000,
                            overflow: 'hidden',
                        }}
                        buttonStyle={{
                            borderRadius: 1000,
                            backgroundColor: '#9b2222',
                        }}
                        onPress={removeWallpaperFromStorage}
                        loading={loading.btn2}
                    />
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center',
                        marginVertical: '10%',
                        color: MyStyles.DarkColor.TOX,
                    }} >{t('blur')}</Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        value={wallBlurDark}
                        step={5}
                        thumbTintColor={MyStyles.DarkColor.KAL}
                        thumbStyle={{
                            width: 30,
                            height: 15,
                        }}
                        onSlidingComplete={(value) => {
                            setWallBlurDark(value)
                            setWallBlurToStorageDark(value.toString())
                        }}


                    />
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center',
                    }}>{wallBlurDark} %</Text>
                </View>
                <View style={{ padding: '2%', width: '50%' }}>


                    <Image source={WallpaperLight ? { uri: WallpaperLight } : LGHTBG}
                        fadeDuration={400}
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 20,
                        }}
                        PlaceholderContent={<Text>Loading...</Text>}
                        blurRadius={wallBlurLight}

                    />

                    <Button title={t('change')}
                        containerStyle={{
                            marginTop: '6%',
                            width: '100%',
                            borderRadius: 1000,
                            overflow: 'hidden',
                        }}
                        buttonStyle={{
                            borderRadius: 1000,
                            backgroundColor: MyStyles.LightColor.KAL,

                        }}
                        onPress={pickImage2}
                        loading={loading.btn3}

                    />
                    <Button title={t('reset')}
                        containerStyle={{
                            marginTop: '6%',
                            width: '100%',
                            borderRadius: 1000,
                            overflow: 'hidden',
                        }}
                        buttonStyle={{
                            borderRadius: 1000,
                            backgroundColor: '#9b2222',

                        }}
                        onPress={removeWallpaperFromStorage2}
                        loading={loading.btn4}
                    />
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center',
                        marginVertical: '10%',
                        color: MyStyles.LightColor.TOX,
                    }} >{t('blur')}</Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        value={wallBlurLight}
                        step={5}
                        thumbTintColor={MyStyles.LightColor.KAL}
                        thumbStyle={{
                            width: 30,
                            height: 15,
                        }}
                        onSlidingComplete={(value) => {
                            setWallBlurLight(value)
                            setWallBlurToStorageLight(value.toString())
                        }}


                    />
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center',
                    }}>{wallBlurLight} %</Text>
                </View>
            </View>
        </View>
    )
}

export default WallpaperScreen