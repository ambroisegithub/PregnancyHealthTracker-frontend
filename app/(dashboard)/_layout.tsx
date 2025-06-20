import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useColorScheme, Text, StyleSheet } from "react-native"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#6b7280",
        headerShown: false,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>Home</Text>,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={focused ? "#10b981" : "#6b7280"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(articles)"
        options={{
          title: "Articles",
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>Articles</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "library" : "library-outline"}
              size={22}
              color={focused ? "#10b981" : "#6b7280"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          title: "Chat",
          tabBarLabel: ({ focused }) => <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>Chat</Text>,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={22}
              color={focused ? "#10b981" : "#6b7280"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>Profile</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={22} color={focused ? "#10b981" : "#6b7280"} />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  activeLabel: {
    color: "#10b981",
    fontSize: 11,
    fontWeight: "600",
  },
  inactiveLabel: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "600",
  },
})
