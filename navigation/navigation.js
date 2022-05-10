import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AboutScreen from '../screens/about/AboutScreen';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, useColorScheme, View, Platform } from 'react-native';
import { MyStyles } from '../assets/styles/styles';
import Setting from '../screens/modals/Setting';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import linking from './LinkingConf';
import WallpaperScreen from '../screens/others/WallpaperScreen';
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
                headerTitle: 'Wallpaper',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                },




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
                    headerTitle: 'Settings',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,
                    },


                    headerLeft: () => (
                        Platform.OS !== 'ios' &&
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="arrow-left-circle" size={25} color={ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX} />
                        </TouchableOpacity>
                    )


                })
                } component={Setting} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
const NavigationBar = () => {
    const ColorScheme = useColorScheme();
    return (


        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: ColorScheme === 'dark' ? MyStyles.DarkColor.TOX : MyStyles.LightColor.KALTR,
                    position: 'absolute',
                    bottom: 20,
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
                            <Text style={{ color: focused ? ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX : 'gray' }}>Tasbih</Text>
                        </View>
                    ),
                    headerShown: false,
                    tabBarActiveTintColor: ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX,


                }}


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
                            <Text style={{ color: focused ? ColorScheme === 'dark' ? MyStyles.DarkColor.KALTRIN : MyStyles.LightColor.TOX : 'gray' }}>About</Text>

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

