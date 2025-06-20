"use client"

import { View, Text, ActivityIndicator } from "react-native"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "expo-router"
import type { RootState } from "../redux/store"

export default function Index() {
  const router = useRouter()
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
  const { hasCompletedPregnancyForm } = useSelector((state: RootState) => state.pregnancy)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/(auth)/login")
      } else if (!hasCompletedPregnancyForm) {
        router.replace("/(onboarding)/welcome")
      } else {
        router.replace("/(dashboard)/(home)")
      }
    }
  }, [isAuthenticated, hasCompletedPregnancyForm, loading])

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#10b981" />
      <Text className="mt-4 text-lg font-medium text-emerald-600">Loading...</Text>
    </View>
  )
}
