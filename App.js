import NavigationApp from "./navigation/navigation";
import { Provider } from 'react-redux'
import { store } from "./app/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { setStatusBarStyle } from 'expo-status-bar'
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import * as MyFont from 'expo-font'


export default function App() {
  const ColorScheme = useColorScheme()
  if (ColorScheme === 'dark') {
    setStatusBarStyle('light')


  } else {
    setStatusBarStyle('dark')

  }
  useEffect(() => {
    MyFont.loadAsync({
      'DigitalFont': require('./assets/fonts/digital-7.ttf'),
    }).then(() => {
      console.log('Fonts loaded')
    })
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
