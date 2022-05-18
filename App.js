import NavigationApp from "./navigation/navigation";
import { Provider } from 'react-redux'
import { store } from "./app/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { setStatusBarStyle } from 'expo-status-bar'
import { Alert, useColorScheme } from "react-native";
import { useEffect } from "react";
import { loadAsync } from 'expo-font'
import * as Updates from 'expo-updates';

import './lang/i18n';
import { useTranslation } from "react-i18next";


export default function App() {
  const ColorScheme = useColorScheme()
  const { t } = useTranslation()
  if (ColorScheme === 'dark') {
    setStatusBarStyle('light')


  } else {
    setStatusBarStyle('dark')

  }
  useEffect(() => {
    loadAsync({
      'DigitalFont': require('./assets/fonts/digital-7.ttf'),
    })

  }, [])
  useEffect(async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        console.log('update availabile')
        Alert.alert(
          t('UpdateAvailable'),
          t('PleaseUpdateToNewVersion'),
          [

            {
              text: t('ok'), onPress: () => Updates.fetchUpdateAsync().then(() => {
                Updates.reloadAsync()
              })
            },
          ],
          { cancelable: false },
        );
        // ... notify user of update ...


      }
    } catch (e) {
      // handle or log error
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationApp />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}
