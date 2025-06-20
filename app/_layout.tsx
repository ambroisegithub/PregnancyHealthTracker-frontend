"use client"

import { Stack } from "expo-router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "expo-router"
import type { RootState } from "../redux/store"

export default function RootLayout() {
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { hasCompletedPregnancyForm } = useSelector((state: RootState) => state.pregnancy)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login")
    } else if (!hasCompletedPregnancyForm) {
      router.replace("/(onboarding)/welcome")
    } else {
      router.replace("/(dashboard)/(home)")
    }
  }, [isAuthenticated, hasCompletedPregnancyForm])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(dashboard)" />
      <Stack.Screen name="index" />
    </Stack>
  )
}
