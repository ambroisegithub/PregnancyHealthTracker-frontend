import { Stack } from "expo-router"

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="pregnancy-form" />
      <Stack.Screen name="setup-complete" />
    </Stack>
  )
}
