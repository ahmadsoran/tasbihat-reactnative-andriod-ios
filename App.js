import NavigationApp from "./navigation/navigation";
import { Provider } from 'react-redux'
import { store } from "./app/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { setStatusBarStyle } from 'expo-status-bar'
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { loadAsync } from 'expo-font'
import * as Updates from 'expo-updates';

import './lang/i18n';


export default function App() {
  const ColorScheme = useColorScheme()
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
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        await Updates.reloadAsync();

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
