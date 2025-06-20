import { Provider } from "react-redux"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/store"
import { NetworkProvider } from "./utils/NetworkContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFonts } from "expo-font"
import { Text, View } from "react-native"
import { Slot } from "expo-router"

import "./global.css"

export default function App() {
  const [fontsLoaded] = useFonts({
    UrbanistBold: require("./assets/fonts/Urbanist-Bold.ttf"),
    UrbanistRegular: require("./assets/fonts/Urbanist-Regular.ttf"),
    UrbanistMedium: require("./assets/fonts/Urbanist-Medium.ttf"),
  })

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-medium text-emerald-600">Loading fonts...</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NetworkProvider>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <Slot />
            </SafeAreaProvider>
          </NetworkProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}
