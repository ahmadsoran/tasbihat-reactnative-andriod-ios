import NavigationApp from "./navigation/navigation";
import { Provider } from 'react-redux'
import { store } from "./app/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { setStatusBarStyle } from 'expo-status-bar'
import { useColorScheme } from "react-native";

export default function App() {
  const ColorScheme = useColorScheme()
  if (ColorScheme === 'dark') {
    setStatusBarStyle('light')


  } else {
    setStatusBarStyle('dark')

  }

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
