import { Alert, Dimensions, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { requestForegroundPermissionsAsync, getForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { Coordinates, Qibla } from 'adhan'
import { Magnetometer } from 'expo-sensors';

const RequestPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        Alert.alert(
            'Permission need be Granted',
            'You need to allow location permission to use this app',
            [
                {
                    text: 'Allow',
                    onPress: () => {
                        RequestPermission();
                    }
                }
            ]

        )


    }
}
const { height, width } = Dimensions.get('window');

const QiblaScreen = ({ navigation }) => {
    // const [subscription, setSubscription] = useState(null);
    // const [magnetometer, setMagnetometer] = useState(0);

    // useEffect(() => {
    //     _toggle();
    //     return () => {
    //         _unsubscribe();
    //     };
    // }, []);

    // const _toggle = () => {
    //     if (subscription) {
    //         _unsubscribe();
    //     } else {
    //         _subscribe();
    //     }
    // };

    // const _subscribe = () => {
    //     setSubscription(
    //         Magnetometer.addListener((data) => {
    //             setMagnetometer(_angle(data));
    //         })
    //     );
    // };

    // const _unsubscribe = () => {
    //     subscription && subscription.remove();
    //     setSubscription(null);
    // };

    // const _angle = (magnetometer) => {
    //     let angle = 0;
    //     if (magnetometer) {
    //         let { x, y, z } = magnetometer;
    //         if (Math.atan2(y, x) >= 0) {
    //             angle = Math.atan2(y, x) * (180 / Math.PI);
    //         } else {
    //             angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    //         }
    //     }
    //     return Math.round(angle);
    // };

    // const _direction = (degree) => {
    //     if (degree >= 22.5 && degree < 67.5) {
    //         return 'NE';
    //     }

    // };

    // // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
    // const _degree = (magnetometer) => {
    //     return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    // };
    // console.log(_direction(_degree(magnetometer)))
    // const [LongAndLat, setLongAndLat] = useState({
    //     latitude: 0,
    //     longitude: 0
    // })
    // const coordinates = new Coordinates(LongAndLat?.latitude, LongAndLat?.longitude);
    // const qiblaDirection = Qibla(coordinates);
    // console.log(qiblaDirection);

    useEffect(async () => {
        const { granted, canAskAgain, status } = await getForegroundPermissionsAsync();
        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true
            })
        } else {

            console.log(status)
            if (canAskAgain) {
                Alert.alert(
                    'Permission need be Granted',
                    'You need to allow location permission to use this app',
                    [
                        {
                            text: 'Allow',
                            onPress: () => {
                                RequestPermission();
                            }
                        }
                    ]

                )
            } else {
                Alert.alert(
                    'to use this feature you need to allow location permission in settings',
                    ' ',
                    [
                        {
                            text: 'ok',
                            onPress: () => {
                                navigation.navigate('zikr')
                            }
                        }
                    ]

                )


            }
        }


    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >

            {/* <Image source={require("../../assets/img/Qibla.png")} style={{
                height: width - 80,
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'contain',
                transform: [{ rotate: 360 - magnetometer + 'deg' }]
            }} /> */}
        </View>
    )
}

export default QiblaScreen

