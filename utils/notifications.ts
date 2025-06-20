import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export const notifications = {
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#10b981",
      })
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    return finalStatus === "granted"
  },

  async scheduleNotification(title: string, body: string, trigger: any) {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: "default",
        },
        trigger,
      })
      return id
    } catch (error) {
      console.error("Error scheduling notification:", error)
      return null
    }
  },

  async scheduleDailyReminder(hour = 9, minute = 0) {
    return await this.scheduleNotification("Daily Pregnancy Tip", "Check out your personalized tip for today!", {
      hour,
      minute,
      repeats: true,
    })
  },

  async scheduleWeeklyUpdate(dayOfWeek = 1, hour = 10) {
    return await this.scheduleNotification("Weekly Pregnancy Update", "See how your baby has grown this week!", {
      weekday: dayOfWeek,
      hour,
      repeats: true,
    })
  },

  async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync()
  },

  async getPushToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync()
      return token.data
    } catch (error) {
      console.error("Error getting push token:", error)
      return null
    }
  },
}
