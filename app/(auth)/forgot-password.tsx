"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useRouter } from "expo-router"
import { AntDesign } from "@expo/vector-icons"

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError("Email is required.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      Alert.alert(
        "Reset Link Sent",
        "If an account with this email exists, you will receive a password reset link shortly.",
        [{ text: "OK", onPress: () => router.back() }],
      )
    } catch (error) {
      setError("Failed to send reset link. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          <View className="mt-12 ml-5">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white rounded-xl shadow-lg items-center justify-center"
            >
              <AntDesign name="left" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-6">
              <Text className="text-3xl">🔐</Text>
            </View>
            <Text className="text-2xl font-bold text-emerald-600 mb-2">Reset Password</Text>
            <Text className="text-base text-gray-600 text-center px-8">
              Enter your email address and we'll send you a link to reset your password
            </Text>
          </View>

          <View className="px-6 pb-8">
            <View className="mb-4">
              <Text className="text-base font-semibold text-emerald-600 mb-2">Email Address</Text>
              <TextInput
                className={`border rounded-3xl px-4 py-3 text-base font-medium ${
                  error ? "border-red-500 text-red-500" : "border-emerald-500 text-black"
                }`}
                value={email}
                onChangeText={(text) => {
                  setEmail(text)
                  setError("")
                }}
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {error && <Text className="text-red-500 text-sm font-semibold mt-1">{error}</Text>}
            </View>

            <TouchableOpacity
              className="bg-emerald-600 rounded-3xl h-12 items-center justify-center mt-4"
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">Send Reset Link</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-600 font-medium text-base">Remember your password? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="text-emerald-600 font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword
