import { requestPermissionsAsync as NotioficationReqPer } from 'expo-notifications';
import { Alert } from 'react-native';
import { openSettings } from 'expo-linking';
export async function requestPermissionsAsync() {
    return await NotioficationReqPer({
        ios: {
            allowAlert: true,
            allowSound: true,
        },
        android: {
            vibrate: true,
            sound: true,
            priority: 'high',
            sticky: false,
        },
    }).then((res) => {
        if (res.status === 'granted') {
            console.log('permission granted');
        }
        else {
            Alert.alert(
                'Notiofication is disabled',
                'You need to allow notifications to get alert of prayer times',
                [
                    {
                        text: 'Allow',
                        onPress: () => openSettings(),
                    },
                ],
                { cancelable: false },
            );
        }
    }
    ).catch((err) => {
        console.log(err);
    });
}
