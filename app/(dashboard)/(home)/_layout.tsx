import { Stack } from "expo-router"

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="pregnancy-status" />
      <Stack.Screen name="daily-tips" />
      <Stack.Screen name="milestone-tracker" />
    </Stack>
  )
}
