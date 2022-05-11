import { View, useColorScheme, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import SettingUI from './SettingUI';
import { CheckBox, Dialog } from '@rneui/themed';
import AsyncStorage from '../../storage/AsyncStorage';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Slider } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { setReload } from '../../slices/ReloaderSlice';
const Setting = ({ navigation }) => {
    const ColorScheme = useColorScheme();
    const [ShowDialogs, setShowDialogs] = useState({ language: false, langReload: false })
    const [ShowDialogsZikr, setShowDialogsZikr] = useState(false)
    const [zikrNum, setZikrNum] = useState(100)
    const [zikrNumStep, setZikrNumStep] = useState(10)
    const [zikrNumMax, setZikrNumMax] = useState(1000)
    const dispatch = useDispatch()
    const isReloading = useSelector(state => state.ReloaderSlice.Reload)

    const [Language, setLanguage] = useState()
    useEffect(() => {
        AsyncStorage.GetFromStorage('language').then(value => {
            if (value !== null) {
                setLanguage(value)
            } else {
                AsyncStorage.SetToStorage('language', 'en')
            }


        })
        AsyncStorage.GetFromStorage('zikrNum').then(value => {
            if (value !== null) {
                setZikrNum(value)
            }


        })
    }, [, ShowDialogs.langReload])
    const setLanguageHandler = (language) => {
        AsyncStorage.SetToStorage('language', language)
    }

    return (

        <View style={{ ...MyStyleSheet.container, height: '100%', backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : 'whitesmoke' }}>
            <SettingUI onPress={() => setShowDialogs({ language: true })} icon={<FontAwesome name="language" size={28} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK} />} SettingName='Lnaguage' />
            <SettingUI onPress={() => setShowDialogsZikr(true)} icon={<MaterialCommunityIcons name="numeric" size={28} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK} />} SettingName='Tasbih Times' />
            <SettingUI onPress={() => {
                navigation.goBack()
                navigation.navigate('WallpaperScreen')
            }} icon={<MaterialCommunityIcons name="wallpaper" size={28} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK} />} SettingName='Wallpaper' />
            <SettingUI onPress={() => {
                navigation.goBack()
                navigation.navigate('AzkarScreen')
            }} icon={<MaterialCommunityIcons name="hands-pray" size={28} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.DARK} />} SettingName='Azkar' />


            <Dialog backdropStyle={{
                backgroundColor: ColorScheme === 'dark' ? '#00001730' : '##ffffff32',
            }}
                isVisible={ShowDialogs.language}
                animationType='fade'
                onBackdropPress={() => setShowDialogs({ language: false })}
                focusable={true}
                shouldRasterizeIOS={true}
            >
                <View style={{
                    borderBottomColor: '#00000049',
                    borderBottomWidth: 1,
                }}>
                    <Text style={{ marginBottom: 10, fontSize: 20, color: '#4c4c4c', textAlign: 'center' }}>
                        Language
                    </Text>
                </View>
                <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    onPressIn={() => {
                        setLanguageHandler('en')
                        setShowDialogs({ langReload: !ShowDialogs.langReload })
                    }}
                    checkedColor='gold'
                    checked={Language === 'en' && true}
                    title={'english'} />
                <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    onPressIn={() => {
                        setLanguageHandler('ku')
                        setShowDialogs({ langReload: !ShowDialogs.langReload })

                    }}
                    checkedColor='gold'
                    checked={Language === 'ku' && true}
                    title={'Kurdish'} />
                <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    onPressIn={() => {
                        setLanguageHandler('ar')
                        setShowDialogs({ langReload: !ShowDialogs.langReload })

                    }}
                    checkedColor='gold'
                    checked={Language === 'ar' && true}
                    title={'Arabic'} />
            </Dialog>
            <Dialog backdropStyle={{
                backgroundColor: ColorScheme === 'dark' ? '#00001730' : '##ffffff32',
            }}
                isVisible={ShowDialogsZikr}
                animationType='fade'
                onBackdropPress={() => setShowDialogsZikr(false)}
                focusable={true}
                shouldRasterizeIOS={true}
            >
                <View style={{
                    borderBottomColor: '#00000049',
                    borderBottomWidth: 1,
                }}>
                    <Text style={{ marginBottom: 10, fontSize: 20, color: '#4c4c4c', textAlign: 'center' }}>
                        Set Tasbih Times
                    </Text>
                </View>
                <Slider
                    minimumValue={10}
                    maximumValue={zikrNumMax}
                    value={zikrNum}
                    onValueChange={(value) => {
                        setZikrNum(Math.floor(value))
                    }}
                    thumbTouchSize={{ width: 200, height: 200 }}
                    thumbStyle={{
                        backgroundColor: zikrNum < 50 ? '#ff0000' : zikrNum >= 50 && zikrNum < 100 ? '#ff6600' : '#008200',
                        borderRadius: 1000,
                        width: 30,
                        height: 30,
                    }}
                    step={zikrNumStep}
                    minimumTrackTintColor={zikrNum < 50 ? '#ff0000' : zikrNum >= 50 && zikrNum < 100 ? '#ff6600' : '#008200'}
                    maximumTrackTintColor='gray'
                    onSlidingComplete={(value) => {
                        AsyncStorage.SetToStorage('zikrNum', value.toString())
                        dispatch(setReload(!isReloading))
                    }}




                />
                {
                    <Text style={{
                        fontSize: 30,
                        color: zikrNum < 50 ? '#ff0000' : zikrNum >= 50 && zikrNum < 100 ? '#ff6600' : '#008200',
                        textAlign: 'center',
                        fontFamily: 'DigitalFont',


                    }}>
                        {zikrNum}
                    </Text>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <CheckBox
                        onPressIn={() => {
                            setZikrNumStep(1)
                            setZikrNumMax(150)

                        }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o" checked={zikrNumStep === 1 && true} title={1} textStyle={{ position: 'absolute', bottom: -20, left: '-50%', transform: [{ translateX: 8 }] }} />
                    <CheckBox
                        onPressIn={() => {
                            setZikrNumStep(10)
                            setZikrNumMax(1000)
                        }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o" checked={zikrNumStep === 10 && true} title={10} textStyle={{ position: 'absolute', bottom: -20, left: '-50%', transform: [{ translateX: 3 }] }} />
                    <CheckBox
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={zikrNumStep === 100 && true}
                        title={100}
                        textStyle={{ position: 'absolute', bottom: -20, left: '-50%', transform: [{ translateX: 3 }] }}
                        onPressIn={() => {
                            setZikrNumStep(100)
                            setZikrNumMax(2000)
                        }}
                    />


                </View>
            </Dialog>
        </View>
    )
}

export default Setting