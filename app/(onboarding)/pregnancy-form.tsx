"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { AntDesign } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { submitPregnancyForm } from "../../redux/slices/pregnancySlice"
import { Picker } from "@react-native-picker/picker"

const PregnancyForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.pregnancy)

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    pregnancyStatus: "Pregnant",
    lastDateOfMenstruation: "",
    gravida: "",
    term: "",
    preterm: "",
    abortion: "",
    living: "",
  })

  const pregnancyStatusOptions = [
    "Pregnant",
    "Delivered",
    "Aborted",
    "Stillbirth",
    "Infertile",
    "Preconception",
    "Menopausal",
    "Nulligravid",
  ]

  const handleSubmit = async () => {
    if (!formData.dateOfBirth || !formData.pregnancyStatus) {
      Alert.alert("Error", "Please fill in all required fields.")
      return
    }

    try {
      const result = await dispatch(
        submitPregnancyForm({
          ...formData,
          gravida: formData.gravida ? Number.parseInt(formData.gravida) : 0,
          term: formData.term ? Number.parseInt(formData.term) : 0,
          preterm: formData.preterm ? Number.parseInt(formData.preterm) : 0,
          abortion: formData.abortion ? Number.parseInt(formData.abortion) : 0,
          living: formData.living ? Number.parseInt(formData.living) : 0,
        }),
      )

      if (submitPregnancyForm.fulfilled.match(result)) {
        router.push("/(onboarding)/setup-complete")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit pregnancy form. Please try again.")
    }
  }

  return (
    <View className="flex-1 bg-white">
      <View className="mt-12 ml-5 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-white rounded-xl shadow-lg items-center justify-center"
        >
          <AntDesign name="left" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-pink-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">📋</Text>
          </View>
          <Text className="text-2xl font-bold text-emerald-600 mb-2">Pregnancy Information</Text>
          <Text className="text-base text-gray-600 text-center">
            Help us provide personalized care by sharing your pregnancy details
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-base font-semibold text-emerald-600 mb-2">Date of Birth *</Text>
            <TextInput
              className="border border-emerald-500 rounded-3xl px-4 py-3 text-base font-medium text-black"
              value={formData.dateOfBirth}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, dateOfBirth: text }))}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-base font-semibold text-emerald-600 mb-2">Pregnancy Status *</Text>
            <View className="border border-emerald-500 rounded-3xl">
              <Picker
                selectedValue={formData.pregnancyStatus}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, pregnancyStatus: value }))}
                style={{ height: 50 }}
              >
                {pregnancyStatusOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>

          {formData.pregnancyStatus === "Pregnant" && (
            <View>
              <Text className="text-base font-semibold text-emerald-600 mb-2">Last Date of Menstruation</Text>
              <TextInput
                className="border border-emerald-500 rounded-3xl px-4 py-3 text-base font-medium text-black"
                value={formData.lastDateOfMenstruation}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, lastDateOfMenstruation: text }))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          <View className="bg-gray-50 rounded-2xl p-4">
            <Text className="text-lg font-bold text-emerald-600 mb-4">Pregnancy History</Text>

            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Gravida</Text>
                <TextInput
                  className="border border-gray-300 rounded-2xl px-3 py-2 text-base text-black"
                  value={formData.gravida}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, gravida: text }))}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Term</Text>
                <TextInput
                  className="border border-gray-300 rounded-2xl px-3 py-2 text-base text-black"
                  value={formData.term}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, term: text }))}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Preterm</Text>
                <TextInput
                  className="border border-gray-300 rounded-2xl px-3 py-2 text-base text-black"
                  value={formData.preterm}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, preterm: text }))}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Abortion</Text>
                <TextInput
                  className="border border-gray-300 rounded-2xl px-3 py-2 text-base text-black"
                  value={formData.abortion}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, abortion: text }))}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Living Children</Text>
              <TextInput
                className="border border-gray-300 rounded-2xl px-3 py-2 text-base text-black"
                value={formData.living}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, living: text }))}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          {error && <Text className="text-red-500 text-sm font-semibold text-center">{error}</Text>}

          <TouchableOpacity
            className="bg-emerald-600 rounded-3xl h-12 items-center justify-center mt-6 mb-8"
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-lg font-bold">Submit Information</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default PregnancyForm
