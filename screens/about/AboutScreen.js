import { View, Text, useColorScheme, Image, Linking, ScrollView } from 'react-native'
import React from 'react'
import { MyStyles, MyStyleSheet } from '../../assets/styles/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const AboutScreen = () => {
    const ColorScheme = useColorScheme();
    const OpenSocalHandler = (url) => {
        Linking.openURL(url);
    }
    return (

        <ScrollView style={{
            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : '#f4fdff',

        }}>

            <View style={{
                ...MyStyleSheet.container,
                marginBottom: '30%',

            }}>

                <View style={{
                    flex: 1,
                    alignItems: 'center',

                }}>
                    <Image source={require('../../assets/img/bismilah.png')} style={{
                        width: '100%',
                        height: 400,

                    }}
                        fadeDuration={300}
                        resizeMode="contain"
                        resizeMethod='resize'

                    />
                    <Text style={{
                        fontSize: 20,
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : 'gray',
                        marginTop: 20,
                        textAlign: 'center',
                        lineHeight: 30,
                        letterSpacing: 1,

                    }}>
                        بەناوی خوای گەورە و مێهرەبان ئەپی تەسبیحات تان پێشکەش ئەکەم و بەردەوام ئەبم لە پەرەپێدانی
                        إنشاء الله بە هیوای ئەوەی سوودتان لێبینیبێت بوو بێتە   مایەی پەیداکردنی ئەجرو پاداشت
                        إنشاء الله ...
                        داواکارم لە برا و خوشکانی مسوڵمان کە لە دوعای خێر بێبەشمان نەکەن بەتایبەتی باوکی کۆچکردوم
                        (سۆران مەجید عەلی)
                        ببێت بە ئەجر و پاداشت بۆی و خوا لە مردووی هەموو مسوڵمانان خۆشبێت
                        (
                        اللَّهُمَّ، اغْفِرْ له وَارْحَمْهُ، وَاعْفُ عنْه وَعَافِهِ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بمَاءٍ وَثَلْجٍ وَبَرَدٍ، وَنَقِّهِ مِنَ الخَطَايَا كما يُنَقَّى الثَّوْبُ الأبْيَضُ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَارًا خَيْرًا مِن دَارِهِ، وَأَهْلًا خَيْرًا مِن أَهْلِهِ، وَزَوْجًا خَيْرًا مِن زَوْجِهِ، وَقِهِ فِتْنَةَ القَبْرِ وَعَذَابَ النَّارِ

                        )
                    </Text>

                    <Text style={{
                        fontSize: 20,
                        marginTop: 40,
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'black',
                    }}>
                        About Developer
                    </Text>
                    <View style={{
                        width: '100%',
                        marginTop: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',


                    }}>

                        <Image source={require('../../assets/img/me.jpg')} style={{
                            width: 50,
                            height: 50,
                            marginVertical: 5,


                        }}
                            fadeDuration={300}
                            resizeMode="cover"
                            resizeMethod='resize'
                            borderRadius={1000}

                        />
                        <Text
                            style={{
                                fontSize: 15,
                                color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : 'gray',
                                marginTop: 20,
                                textAlign: 'center',
                                lineHeight: 30,
                                letterSpacing: 1,
                            }}>

                            Hey, iam Ahmed Soran Majeed From <Text style={{ color: 'darkred' }}>Kurdistan</Text> and i am a Full-Stack Web & App developer.
                        </Text>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            marginTop: 20,

                        }}>
                            <Entypo onPress={() => OpenSocalHandler('https://twitter.com/ahmadsorannn')} name="twitter" size={45} color="#14b5de" />
                            <FontAwesome5 onPress={() => OpenSocalHandler('https://www.facebook.com/ahmadSoranNn')} name="facebook-f" size={45} color="#015ec1" />
                            <FontAwesome5 onPress={() => OpenSocalHandler('https://github.com/ahmadsoran')} name="github" size={45} color="black" />
                            <Entypo onPress={() => OpenSocalHandler('https://iq.linkedin.com/in/ahmad-soran-233935231')} name="linkedin" size={45} color="#004c93" />
                            <MaterialCommunityIcons onPress={() => OpenSocalHandler('https://www.ahmadsoran.com/')} name="web" size={45} color="gray" />
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            marginTop: 20,

                        }}>
                            <MaterialCommunityIcons onPress={() => Linking.openURL('mailto:ahmadsorann1@gmail.com')} name="email" size={45} color="#56b290ff" />

                        </View>
                    </View>
                </View>


            </View>
        </ScrollView>

    )
}

export default AboutScreen