"use client"
import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../redux/store"
import { setOnboardingComplete } from "../../redux/slices/pregnancySlice"

const SetupComplete = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleContinue = () => {
    dispatch(setOnboardingComplete())
    router.replace("/(dashboard)/(home)")
  }

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="w-32 h-32 bg-green-100 rounded-full items-center justify-center mb-8">
        <Text className="text-6xl">🎉</Text>
      </View>

      <Text className="text-3xl font-bold text-emerald-600 text-center mb-4">You're All Set!</Text>

      <Text className="text-lg text-gray-600 text-center mb-8 leading-6">
        Your pregnancy profile has been created successfully. You'll now receive personalized tips, articles, and
        support throughout your journey.
      </Text>

      <View className="w-full space-y-4 mb-8">
        <View className="bg-emerald-50 rounded-2xl p-4">
          <Text className="text-emerald-700 font-semibold mb-2">What's Next?</Text>
          <Text className="text-emerald-600">• Get daily pregnancy tips and insights</Text>
          <Text className="text-emerald-600">• Read personalized articles for your stage</Text>
          <Text className="text-emerald-600">• Chat with our AI pregnancy assistant</Text>
          <Text className="text-emerald-600">• Track your pregnancy milestones</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-emerald-600 rounded-3xl h-14 w-full items-center justify-center"
        onPress={handleContinue}
      >
        <Text className="text-white text-lg font-bold">Continue to App</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SetupComplete
