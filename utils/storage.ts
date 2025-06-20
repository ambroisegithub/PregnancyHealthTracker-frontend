import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEYS } from "./constants"

export const storage = {
  // Token management
  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token)
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN)
  },

  async removeToken(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN)
  },

  // User data management
  async setUser(user: any): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  async getUser(): Promise<any | null> {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER)
    return userData ? JSON.parse(userData) : null
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER)
  },

  // Pregnancy data management
  async setPregnancyData(data: any): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.PREGNANCY_DATA, JSON.stringify(data))
  },

  async getPregnancyData(): Promise<any | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PREGNANCY_DATA)
    return data ? JSON.parse(data) : null
  },

  async removePregnancyData(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.PREGNANCY_DATA)
  },

  // Onboarding status
  async setOnboardingComplete(complete: boolean): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, JSON.stringify(complete))
  },

  async getOnboardingComplete(): Promise<boolean> {
    const complete = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE)
    return complete ? JSON.parse(complete) : false
  },

  // Clear all data
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.PREGNANCY_DATA,
      STORAGE_KEYS.ONBOARDING_COMPLETE,
    ])
  },
}
