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
import { registerUser } from "../../redux/slices/authSlice"

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "",
    city: "",
  })
  const [errors, setErrors] = useState({
    firstName: { message: "", valid: true },
    lastName: { message: "", valid: true },
    email: { message: "", valid: true },
    password: { message: "", valid: true },
    phoneNumber: { message: "", valid: true },
  })
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const firstNameError = formData.firstName === ""
    const lastNameError = formData.lastName === ""
    const emailError = formData.email === ""
    const invalidEmail = !validateEmail(formData.email) && !emailError
    const passwordError = formData.password === ""
    const weakPassword = formData.password.length < 6 && !passwordError
    const phoneError = formData.phoneNumber === ""

    setErrors({
      firstName: {
        message: firstNameError ? "First name is required." : "",
        valid: !firstNameError,
      },
      lastName: {
        message: lastNameError ? "Last name is required." : "",
        valid: !lastNameError,
      },
      email: {
        message: emailError ? "Email is required." : invalidEmail ? "Please enter a valid email address." : "",
        valid: !emailError && !invalidEmail,
      },
      password: {
        message: passwordError
          ? "Password is required."
          : weakPassword
            ? "Password must be at least 6 characters long."
            : "",
        valid: !passwordError && !weakPassword,
      },
      phoneNumber: {
        message: phoneError ? "Phone number is required." : "",
        valid: !phoneError,
      },
    })

    return (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !invalidEmail &&
      !passwordError &&
      !weakPassword &&
      !phoneError
    )
  }

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const result = await dispatch(registerUser(formData))
        if (registerUser.fulfilled.match(result)) {
          Alert.alert("Success", "Account created successfully!", [
            { text: "OK", onPress: () => router.replace("/(onboarding)/welcome") },
          ])
        }
      } catch (error) {
        Alert.alert("Registration Failed", "Please try again.")
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
        <View className="flex-1">
          <View className="mt-12 ml-5">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white rounded-xl shadow-lg items-center justify-center"
            >
              <AntDesign name="left" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-8 mt-8">
            <View className="w-24 h-24 bg-pink-100 rounded-full items-center justify-center mb-6">
              <Text className="text-3xl">👶</Text>
            </View>
            <Text className="text-2xl font-bold text-emerald-600 mb-2">Create Account</Text>
            <Text className="text-base text-gray-600 text-center px-8">Join us to start your pregnancy journey</Text>
          </View>

          <View className="px-6 pb-8">
            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-base font-semibold text-emerald-600 mb-2">First Name</Text>
                <TextInput
                  className={`border rounded-3xl px-4 py-3 text-base font-medium ${
                    !errors.firstName.valid ? "border-red-500 text-red-500" : "border-emerald-500 text-black"
                  }`}
                  value={formData.firstName}
                  onChangeText={(text) => handleChangeText("firstName", text)}
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                />
                {!errors.firstName.valid && (
                  <Text className="text-red-500 text-sm font-semibold mt-1">{errors.firstName.message}</Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-emerald-600 mb-2">Last Name</Text>
                <TextInput
                  className={`border rounded-3xl px-4 py-3 text-base font-medium ${
                    !errors.lastName.valid ? "border-red-500 text-red-500" : "border-emerald-500 text-black"
                  }`}
                  value={formData.lastName}
                  onChangeText={(text) => handleChangeText("lastName", text)}
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                />
                {!errors.lastName.valid && (
                  <Text className="text-red-500 text-sm font-semibold mt-1">{errors.lastName.message}</Text>
                )}
              </View>
            </View>

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
              <Text className="text-base font-semibold text-emerald-600 mb-2">Phone Number</Text>
              <TextInput
                className={`border rounded-3xl px-4 py-3 text-base font-medium ${
                  !errors.phoneNumber.valid ? "border-red-500 text-red-500" : "border-emerald-500 text-black"
                }`}
                value={formData.phoneNumber}
                onChangeText={(text) => handleChangeText("phoneNumber", text)}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
              {!errors.phoneNumber.valid && (
                <Text className="text-red-500 text-sm font-semibold mt-1">{errors.phoneNumber.message}</Text>
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
            </View>

            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-base font-semibold text-emerald-600 mb-2">Country</Text>
                <TextInput
                  className="border border-emerald-500 rounded-3xl px-4 py-3 text-base font-medium text-black"
                  value={formData.country}
                  onChangeText={(text) => handleChangeText("country", text)}
                  placeholder="Country"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-emerald-600 mb-2">City</Text>
                <TextInput
                  className="border border-emerald-500 rounded-3xl px-4 py-3 text-base font-medium text-black"
                  value={formData.city}
                  onChangeText={(text) => handleChangeText("city", text)}
                  placeholder="City"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {error && <Text className="text-red-500 text-sm font-semibold mb-4 text-center">{error}</Text>}

            <TouchableOpacity
              className="bg-emerald-600 rounded-3xl h-12 items-center justify-center mt-4"
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">Create Account</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center justify-center mt-6">
              <Text className="text-gray-600 font-medium text-base">Already have an account? </Text>
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

export default Register
