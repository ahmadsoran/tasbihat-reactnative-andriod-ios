import { View, Text, ImageBackground, TouchableOpacity, Vibration, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import LightBG from '../../assets/img/natureLight.jpg'
import DarkBG from '../../assets/img/natureDark.jpg'
import soundRF from '../../assets/audio/penClick.mp3'
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import * as MyFont from 'expo-font'
const Home = ({ navigation }) => {
    const [ZikrNum, setZikrNum] = useState(0)
    const [ZikrNext, setZikrNext] = useState(0)
    const ColorScheme = useColorScheme()
    const azkar = ['سُبْحَانَ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'لا إِلَهَ إِلا اللَّهُ', 'اللَّهُ أَكْبَر']
    const [sound, setSound] = React.useState();
    const [fontLoaded, setFontLoaded] = React.useState(false);
    MyFont.loadAsync({
        'DigitalFont': require('../../assets/fonts/digital-7.ttf'),
    }).then(() => {
        setFontLoaded(true);
    });



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

    if (ZikrNum > 100) {
        setZikrNum(0)
        setZikrNext(ZikrNext + 1)
        Vibration.vibrate(1000)

    }
    if (ZikrNext >= azkar.length) {
        setZikrNext(0)


    }


    return (
        <>
            <ImageBackground source={LightBG} blurRadius={20} style={{
                width: '102%', height: '102%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: ColorScheme === 'dark' ? -2 : -1,
                opacity: ColorScheme === 'dark' ? 0 : 1,
            }} />
            <ImageBackground source={DarkBG} blurRadius={20} style={{
                width: '102%', height: '102%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: ColorScheme === 'dark' ? -1 : -2,
                opacity: ColorScheme === 'dark' ? 1 : 0,
            }} />
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
                            <View style={{ backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS, borderRadius: 10, padding: 10, width: '80%', height: '80%' }}>

                                <Text style={{ textAlign: 'center', fontSize: 50, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX }}>
                                    {azkar[ZikrNext]}
                                </Text>
                                <Text style={{ textAlign: 'center', fontSize: 50, marginTop: 20, opacity: 0.7, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX }}>Count</Text>
                                {
                                    fontLoaded ?
                                        <Text style={{ textAlign: 'center', fontSize: 65, opacity: .7, marginTop: 30, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.TOX, fontFamily: 'DigitalFont' }}>{ZikrNum}</Text>
                                        :
                                        <Text style={{ textAlign: 'center', fontSize: 65, opacity: .7, marginTop: 30, color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.TOX }}>{ZikrNum}</Text>

                                }
                            </View>
                        </View>

                        <TouchableOpacity onPress={playSound} onPressIn={ZikrNumHandler} style={{
                            width: '100%',
                            height: '50%',
                            flex: 1,
                            alignItems: 'center',

                        }}>
                            <View style={{ borderRadius: 1000, backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS, width: 150, height: 150, marginTop: 20 }}>



                                <Text style={{
                                    textAlign: 'center', fontSize: 60, transform: [{ translateY: 32 }],
                                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : MyStyles.LightColor.TOX

                                }}>
                                    {ZikrNum}
                                </Text>

                            </View>
                        </TouchableOpacity>


                    </View>

                </View>
            </SafeAreaView>
        </>


    )
}

export default Home