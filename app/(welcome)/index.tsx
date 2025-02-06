import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Link, SplashScreen } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function WelcomeScreen() {
  const [loaded, error] = useFonts({
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "LuckiestGuy-Regular": require("../../assets/fonts/LuckiestGuy-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#4B6BFB" />
      <LinearGradient
        colors={["#111111", "#111111", "#00d5be"]}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/* Main Container */}
          <View className="flex-1 items-center justify-center space-y-4">
            {/* Wallet Icon Container with Gray Gradient */}
            <View className="">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/diyxwdtjd/image/upload/v1738073291/projects/Screenshot_2025-01-28_at_7.26.51_PM-removebg-preview_xqiswr.png",
                }}
                className="w-48 h-48 mb-[-30px]"
                resizeMode="contain"
              />
            </View>

            {/* Logo and Text */}
            <View className="items-center space-y-3">
              <View className="flex-row items-center space-x-2">
                {/* <View className="w-8 h-8 bg-[#4B6BFB] rounded-lg" /> */}
                {/* <Text 
                  style={{ fontFamily: 'LuckiestGuy-Regular' }} 
                  className="text-white text-4xl"
                >
                  drobb
                </Text> */}
              </View>
              <Text className="text-gray-400 text-base text-center">
                Connect with friends, share moments, and explore stories
              </Text>
            </View>

            {/* Get Started Button */}
            <Link href="/sign-up" asChild>
              <Pressable className="w-full bg-[#00d5be] py-4 rounded-xl mt-12">
                <Text className="text-white text-center text-lg font-extrabold">
                  Get Started
                </Text>
              </Pressable>
            </Link>
            <Link href="/sign-in" asChild>
              <Pressable className="w-full bg-[#00d5be] py-4 rounded-xl mt-6">
                <Text className="text-white text-center text-lg font-extrabold">
                  Sign In
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
