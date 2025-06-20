"use client"
import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

const Welcome = () => {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <View className="flex-1 bg-gradient-to-b from-emerald-50 to-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-32 h-32 bg-pink-100 rounded-full items-center justify-center mb-8">
          <Text className="text-6xl">🤱</Text>
        </View>

        <Text className="text-3xl font-bold text-emerald-600 text-center mb-4">
          Welcome, {user?.profile?.firstName || "Mom"}!
        </Text>

        <Text className="text-lg text-gray-600 text-center mb-8 leading-6">
          Let's set up your pregnancy profile to provide you with personalized care and support throughout your journey.
        </Text>

        <View className="w-full space-y-4 mb-8">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center mr-4">
              <Text className="text-emerald-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">Personalized pregnancy tracking</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center mr-4">
              <Text className="text-emerald-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">Daily tips and articles</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center mr-4">
              <Text className="text-emerald-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">AI-powered pregnancy assistant</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center mr-4">
              <Text className="text-emerald-600 font-bold">✓</Text>
            </View>
            <Text className="text-gray-700 flex-1">WhatsApp notifications</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-emerald-600 rounded-3xl h-14 w-full items-center justify-center mb-4"
          onPress={() => router.push("/(onboarding)/pregnancy-form")}
        >
          <Text className="text-white text-lg font-bold">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(onboarding)/setup-complete")}>
          <Text className="text-gray-500 font-medium underline">Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome
