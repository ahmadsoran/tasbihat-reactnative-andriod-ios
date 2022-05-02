import { View, Text, useColorScheme, Image, Linking } from 'react-native'
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
        <SafeAreaView style={{
            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : '#f4fdff',
        }}>

            <View style={{
                ...MyStyleSheet.container,
                height: '130%',
                backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.BGTOX : '#f4fdff',
            }}>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <Image source={require('../../assets/img/me.jpg')} style={{
                        width: 200,
                        height: 200,
                        borderRadius: 1000,
                    }} />
                    <Text style={{
                        fontSize: 20,
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KAL : 'gray',
                        marginTop: 20,

                    }}>
                        Hey, iam Ahmed Soran Majeed From <Text style={{ color: 'darkred' }}>Kurdistan</Text> and i am a Full-Stack Web & App developer.
                    </Text>

                    <Text style={{
                        fontSize: 20,
                        marginTop: 40,
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : 'black',
                    }}>Follow me</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '100%',
                        marginTop: 20,

                    }}>
                        <Entypo onPress={() => OpenSocalHandler('https://twitter.com/ahmadsorannn')} name="twitter" size={45} color="#14b5de" />
                        <FontAwesome5 onPress={() => OpenSocalHandler('https://www.facebook.com/ahmasoran')} name="facebook-f" size={45} color="#015ec1" />
                        <FontAwesome5 onPress={() => OpenSocalHandler('https://github.com/ahmadsoran')} name="github" size={45} color="black" />
                        <Entypo onPress={() => OpenSocalHandler('https://iq.linkedin.com/in/ahmad-soran-233935231')} name="linkedin" size={45} color="#004c93" />
                        <MaterialCommunityIcons onPress={() => OpenSocalHandler('https://www.ahmadsoran.com/')} name="web" size={45} color="gray" />

                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default AboutScreen