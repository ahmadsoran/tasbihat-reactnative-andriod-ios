import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AboutScreen from '../screens/about/AboutScreen';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { MyStyles } from '../assets/styles/styles';
import Setting from '../screens/modals/Setting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import linking from './LinkingConf';
import WallpaperScreen from '../screens/others/WallpaperScreen';
import AzkarScreen from '../screens/others/AzkarScreen';
import { setOpenBottomSheet, setOpenSuraList, setOpenSuraListDialog } from '../slices/ReloaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import QuranScreen from '../screens/quran/QuranScreen';
import AsyncStorage from '../storage/AsyncStorage';
const Tab = createBottomTabNavigator();
export default function NavigationApp() {
    return (
        <NavigationContainer linking={linking}>
            <RootNavigator />
        </NavigationContainer>
    );
}
const Stack = createNativeStackNavigator();

function RootNavigator() {


    const ColorScheme = useColorScheme();
    const dispatch = useDispatch();
    const openBottomSheet = useSelector(state => state.ReloaderSlice.openBottomSheet);
    const { t } = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={NavigationBar} options={{ headerShown: false }} />
            <Stack.Screen name="WallpaperScreen" component={WallpaperScreen} options={{
                animation: 'slide_from_right',
                customAnimationOnGesture: true,
                gestureEnabled: true,
                headerStyle: {
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,

                },
                headerTitle: t('wallpaper'),
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                },
            }} />
            <Stack.Screen name="AzkarScreen" component={AzkarScreen} options={{
                animation: 'slide_from_right',
                customAnimationOnGesture: true,
                gestureEnabled: true,
                headerStyle: {
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,

                },
                headerTitle: t('azkar'),
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => {
                        dispatch(setOpenBottomSheet(!openBottomSheet))
                    }}>
                        <MaterialCommunityIcons name="dots-vertical" size={30} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Group screenOptions={{
                presentation: 'modal', animation: 'slide_from_bottom'

            }}>
                <Stack.Screen name="Modal" options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOXTRANS : MyStyles.LightColor.KALTRINTRANS,
                        borderBottomWidth: 0,
                        elevation: 0,



                    },
                    headerTitle: () => (
                        <Text style={{
                            fontSize: 20,
                            color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                        }}>
                            {t('settings')}
                        </Text>
                    ),
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                    },





                })
                } component={Setting} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
const NavigationBar = () => {
    const [SuraNow, setSuraNow] = useState('')
    const ColorScheme = useColorScheme();
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const openSuraList = useSelector(state => state.ReloaderSlice.openSuraList);
    const openSuraListDialog = useSelector(state => state.ReloaderSlice.openSuraListDialog);
    useEffect(() => {
        AsyncStorage.multiGetFromStorage('SuraNow', 'SuraID').then(res => {
            if (res[0][1] && res[1][1] !== null) {
                setSuraNow(res[0][1])
            } else {
                AsyncStorage.multiSetToStorage('SuraNow', 'الفاتحة', 'SuraID', '1');

            }
        })
    }, [, openSuraList])
    return (


        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    borderRadius: 20,
                    elevation: 13,
                    shadowColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    height: 80,
                    borderTopWidth: 0
                },



            }}
            safeAreaInsets={{ bottom: 0, top: 0, border: 0, borderTopWidth: 0 }}

        >
            <Tab.Screen
                name="zikr"
                component={Home}
                options={{


                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: focused ? 1 : 0.5,
                        }}>
                            <MaterialCommunityIcons name="hands-pray" size={size} color={color} />
                            <Text style={{ color: focused ? ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX : 'gray' }}>{t('tasbih')}</Text>
                        </View>
                    ),
                    headerShown: false,
                    tabBarActiveTintColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,


                }}


            />
            <Tab.Screen
                name="Quran"
                options={{
                    tabBarLabel: 'Quran',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',

                            transform: [{ translateY: -20 }],
                            backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                            padding: 10,
                            borderRadius: 1000,


                        }}>
                            <View style={{
                                opacity: focused ? 1 : 0.5,
                            }}>

                                <Entypo name="open-book" size={size * 2} color={color} />
                                <Text style={{ fontSize: 20, color: focused ? ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX : 'gray' }}>{t('quran')}</Text>

                            </View>
                        </View>
                    ),
                    tabBarActiveTintColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                    headerStyle: {
                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                        elevation: 10,
                        shadowOpacity: .5,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowColor: MyStyles.DarkColor.TOX,

                    },
                    headerTitle: () => (
                        <Text style={{
                            color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                            fontSize: 20
                        }}

                        >
                            {SuraNow}
                        </Text>
                    ),
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                    },
                    headerRight: () => (
                        <TouchableOpacity onLongPress={() => {
                            dispatch(setOpenSuraList(!openSuraList))
                        }}
                            onPress={() => {
                                dispatch(setOpenSuraListDialog(!openSuraListDialog))
                            }}
                        >
                            <MaterialCommunityIcons name="dots-vertical" size={30} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX} />
                        </TouchableOpacity>
                    )

                }}

                component={QuranScreen}

            />
            <Tab.Screen
                name="About"
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: focused ? 1 : 0.5,
                        }}>

                            <Entypo name="info-with-circle" size={size} color={color} />
                            <Text style={{ color: focused ? ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX : 'gray' }}>{t('about')}</Text>

                        </View>
                    ),
                    tabBarActiveTintColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                    headerStyle: {
                        backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                        elevation: 10,
                        shadowOpacity: .5,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 2 },
                        shadowColor: MyStyles.DarkColor.TOX,

                    },
                    headerTitle: 'About',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                    }
                }}

                component={AboutScreen}

            />

        </Tab.Navigator>




    )
}

