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
import { AntDesign, Feather } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { loginUser } from "../../redux/slices/authSlice"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({
    email: { message: "", valid: true },
    password: { message: "", valid: true },
  })
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const emailError = formData.email === ""
    const invalidEmail = !validateEmail(formData.email) && !emailError
    const passwordError = formData.password === ""

    setErrors({
      email: {
        message: emailError ? "Email is required." : invalidEmail ? "Please enter a valid email address." : "",
        valid: !emailError && !invalidEmail,
      },
      password: {
        message: passwordError ? "Password is required." : "",
        valid: !passwordError,
      },
    })

    return !emailError && !invalidEmail && !passwordError
  }

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const result = await dispatch(loginUser(formData))
        if (loginUser.fulfilled.match(result)) {
          router.replace("/(dashboard)/(home)")
        }
      } catch (error) {
        Alert.alert("Login Failed", "Please check your credentials and try again.")
      }
    }
  }

  const handleChangeText = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({
      ...prev,
      [field]: { message: "", valid: true },
    }))
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
            <View className="w-24 h-24 bg-emerald-100 rounded-full items-center justify-center mb-6">
              <Text className="text-3xl">🤱</Text>
            </View>
            <Text className="text-2xl font-bold text-emerald-600 mb-2">Welcome Back</Text>
            <Text className="text-base text-gray-600 text-center px-8">Sign in to continue your pregnancy journey</Text>
          </View>

          <View className="px-6 pb-8">
            <View className="mb-4">
              <Text className="text-base font-semibold text-emerald-600 mb-2">Email Address</Text>
              <TextInput
                className={`border rounded-3xl px-4 py-3 text-base font-medium ${
                  !errors.email.valid ? "border-red-500 text-red-500" : "border-emerald-500 text-black"
                }`}
                value={formData.email}
                onChangeText={(text) => handleChangeText("email", text)}
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!errors.email.valid && (
                <Text className="text-red-500 text-sm font-semibold mt-1">{errors.email.message}</Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-base font-semibold text-emerald-600 mb-2">Password</Text>
              <View className="relative">
                <TextInput
                  className={`border rounded-3xl px-4 py-3 text-base font-medium pr-12 ${
                    !errors.password.valid ? "border-red-500 text-red-500" : "border-emerald-500 text-black"
                  }`}
                  value={formData.password}
                  onChangeText={(text) => handleChangeText("password", text)}
                  placeholder="••••••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
              {!errors.password.valid && (
                <Text className="text-red-500 text-sm font-semibold mt-1">{errors.password.message}</Text>
              )}
              <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")} className="mt-2">
                <Text className="text-emerald-600 font-semibold underline">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {error && <Text className="text-red-500 text-sm font-semibold mb-4 text-center">{error}</Text>}

            <TouchableOpacity
              className="bg-emerald-600 rounded-3xl h-12 items-center justify-center mt-4"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">Sign In</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-600 font-medium text-base">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text className="text-emerald-600 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
