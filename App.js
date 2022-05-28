import NavigationApp from "./navigation/navigation";
import { Provider } from 'react-redux'
import { store } from "./app/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { setStatusBarStyle } from 'expo-status-bar'
import { Alert, useColorScheme } from "react-native";
import { useEffect } from "react";
import { loadAsync } from 'expo-font'
import './lang/i18n';
import * as Updates from 'expo-updates';
import { requestPermissionsAsync } from "./Permissions";
import { openSettings } from 'expo-linking'

async function checkForUpdate() {
  const update = await Updates.checkForUpdateAsync();
  try {
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // ... notify user of update
      await Updates.reloadAsync();
    }
  } catch (e) {
    console.log(e);
  }
}

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
    // if not in production mode
    if (!__DEV__) {
      checkForUpdate();
    }

    requestPermissionsAsync();


  }, [])

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
