"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import { useRouter } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../redux/store"
import { getPregnancyStatusWithAI } from "../../../redux/slices/pregnancySlice"
import { Ionicons } from "@expo/vector-icons"

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { pregnancyData, loading, aiInsight } = useSelector((state: RootState) => state.pregnancy)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    dispatch(getPregnancyStatusWithAI())
  }, [dispatch])

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(getPregnancyStatusWithAI())
    setRefreshing(false)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const getPregnancyWeekDisplay = () => {
    if (pregnancyData?.pregnancyStatus === "Pregnant" && pregnancyData?.gestationalWeeks) {
      return `${pregnancyData.gestationalWeeks} weeks, ${pregnancyData.gestationalDays || 0} days`
    }
    return pregnancyData?.pregnancyStatus || "Not specified"
  }

  const getTrimesterDisplay = () => {
    if (pregnancyData?.currentTrimester) {
      const trimesterNames = { 1: "First", 2: "Second", 3: "Third" }
      return `${trimesterNames[pregnancyData.currentTrimester as keyof typeof trimesterNames]} Trimester`
    }
    return null
  }

  return (
    <View className="flex-1 bg-white">
      <View className="bg-emerald-600 pt-12 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white text-lg font-medium">
              {getGreeting()}, {user?.profile?.firstName || "Mom"}!
            </Text>
            <Text className="text-emerald-100 text-sm">How are you feeling today?</Text>
          </View>
          <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-2xl">🤱</Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6 -mt-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Pregnancy Status Card */}
        <TouchableOpacity
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4"
          onPress={() => router.push("/(dashboard)/(home)/pregnancy-status")}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-800">Pregnancy Status</Text>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </View>

          {loading ? (
            <ActivityIndicator size="small" color="#10b981" />
          ) : (
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-3 h-3 bg-emerald-500 rounded-full mr-3" />
                <Text className="text-base font-semibold text-gray-700">{getPregnancyWeekDisplay()}</Text>
              </View>

              {getTrimesterDisplay() && (
                <View className="flex-row items-center mb-2">
                  <View className="w-3 h-3 bg-pink-400 rounded-full mr-3" />
                  <Text className="text-base font-semibold text-gray-700">{getTrimesterDisplay()}</Text>
                </View>
              )}

              {pregnancyData?.expectedDeliveryDate && (
                <View className="flex-row items-center">
                  <View className="w-3 h-3 bg-blue-400 rounded-full mr-3" />
                  <Text className="text-base font-semibold text-gray-700">
                    Due: {new Date(pregnancyData.expectedDeliveryDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>

        {/* AI Insight Card */}
        {aiInsight && (
          <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-4 border border-purple-100">
            <View className="flex-row items-center mb-3">
              <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center mr-3">
                <Text className="text-purple-600 font-bold">AI</Text>
              </View>
              <Text className="text-lg font-bold text-purple-800">Personal Insight</Text>
            </View>
            <Text className="text-purple-700 leading-5">{aiInsight}</Text>
          </View>
        )}

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Quick Actions</Text>

          <View className="flex-row space-x-3 mb-3">
            <TouchableOpacity
              className="flex-1 bg-emerald-50 rounded-2xl p-4 items-center"
              onPress={() => router.push("/(dashboard)/(home)/daily-tips")}
            >
              <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="bulb" size={24} color="#10b981" />
              </View>
              <Text className="text-emerald-700 font-semibold text-center">Daily Tips</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-pink-50 rounded-2xl p-4 items-center"
              onPress={() => router.push("/(dashboard)/(articles)")}
            >
              <View className="w-12 h-12 bg-pink-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="library" size={24} color="#ec4899" />
              </View>
              <Text className="text-pink-700 font-semibold text-center">Articles</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-blue-50 rounded-2xl p-4 items-center"
              onPress={() => router.push("/(dashboard)/(chat)")}
            >
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="chatbubbles" size={24} color="#3b82f6" />
              </View>
              <Text className="text-blue-700 font-semibold text-center">AI Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-orange-50 rounded-2xl p-4 items-center"
              onPress={() => router.push("/(dashboard)/(home)/milestone-tracker")}
            >
              <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="trophy" size={24} color="#f97316" />
              </View>
              <Text className="text-orange-700 font-semibold text-center">Milestones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Progress */}
        {pregnancyData?.pregnancyStatus === "Pregnant" && pregnancyData?.gestationalWeeks && (
          <View className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6 border border-emerald-100">
            <Text className="text-lg font-bold text-emerald-800 mb-3">
              Week {pregnancyData.gestationalWeeks} Progress
            </Text>

            <View className="bg-white rounded-xl p-4">
              <Text className="text-emerald-700 font-medium mb-2">Your baby is growing!</Text>
              <Text className="text-gray-600 text-sm leading-5">
                At {pregnancyData.gestationalWeeks} weeks, your baby is developing rapidly. Keep taking your prenatal
                vitamins and stay hydrated.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Home
