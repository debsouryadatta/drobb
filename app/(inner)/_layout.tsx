import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthRoutesLayout() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 25,
            height: 65,
            paddingTop: 15,
            paddingBottom: 5,
            paddingHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.15,
            shadowRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className={`items-center justify-end pb-2 w-16 h-[40px] ${
                  focused ? "bg-black/5 rounded-2xl" : ""
                }`}
              >
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? "#000" : "#999"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className={`items-center justify-end pb-2 w-16 h-[40px] ${
                  focused ? "bg-black/5 rounded-2xl" : ""
                }`}
              >
                <Ionicons
                  name={focused ? "bookmark" : "bookmark-outline"}
                  size={26}
                  color={focused ? "#000" : "#999"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className={`items-center justify-end pb-2 w-16 h-[40px] ${
                  focused ? "bg-black/5 rounded-2xl" : ""
                }`}
              >
                <Ionicons
                  name={focused ? "compass" : "compass-outline"}
                  size={26}
                  color={focused ? "#000" : "#999"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className={`items-center justify-end pb-2 w-16 h-[40px] ${
                  focused ? "bg-black/5 rounded-2xl" : ""
                }`}
              >
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  size={26}
                  color={focused ? "#000" : "#999"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className={`items-center justify-end pb-2 w-16 h-[40px] ${
                  focused ? "bg-black/5 rounded-2xl" : ""
                }`}
              >
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={26}
                  color={focused ? "#000" : "#999"}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
