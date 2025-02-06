import * as React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const onSignUpPress = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          password,
          name: username,
          gender: "OTHER", // Default value;
          birthDate: "2000-01-01", // Default value;
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (err) {
        console.error("JSON parse error:", responseText);
        throw new Error(responseText || "Server error");
      }

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: data.message,
      });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Signup Error",
        text2: err.message || "Something went wrong",
      });
    }
  };

  const onPressVerify = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          otp: code,
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (err) {
        console.error("JSON parse error:", responseText);
        throw new Error(responseText || "Server error");
      }

      if (!response.ok) {
        throw new Error(data.message || "OTP Verification failed");
      }

      //jwt token is saved here- devo sourya just call get token from async storage for future routes/middleware
      await AsyncStorage.setItem("token", data.token);
      Toast.show({
        type: "success",
        text1: "Verification Successful",
        text2: data.message,
      });
      router.replace("/onboarding");
    } catch (err: any) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Verification Error",
        text2: err.message || "Something went wrong",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={["#111111", "#111111", "#FFFFFF"]}
        className="flex-1"
      >
        <View className="flex-1 px-5">
          <StatusBar style="light" />

          {!pendingVerification && (
            <>
              <TouchableOpacity
                onPress={() => router.back()}
                className="mt-14 w-9 h-9 rounded-full bg-[#1A1A1A]/50 items-center justify-center"
              >
                <Ionicons name="chevron-back" size={20} color="#666666" />
              </TouchableOpacity>

              <View className="mt-8">
                <Text className="text-white text-[40px] font-bold leading-10 tracking-wide">
                  Create
                </Text>
                <Text className="text-white text-[40px] font-bold leading-10 tracking-wide mt-1">
                  Account
                </Text>
                <Text className="text-[#666666] text-base mt-3">
                  Please fill in the form to continue
                </Text>
              </View>

              <View className="space-y-5 mt-12">
                <View>
                  <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                    Username
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base pl-11"
                      placeholder="username"
                      placeholderTextColor="#666666"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                      style={{ fontWeight: "400" }}
                    />
                    <View className="absolute left-4 top-4">
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#666666"
                      />
                    </View>
                  </View>
                </View>

                <View>
                  <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                    Email
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base pl-11"
                      placeholder="example@email.com"
                      placeholderTextColor="#666666"
                      value={emailAddress}
                      onChangeText={setEmailAddress}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      style={{ fontWeight: "400" }}
                    />
                    <View className="absolute left-4 top-4">
                      <Ionicons name="mail-outline" size={20} color="#666666" />
                    </View>
                  </View>
                </View>

                <View>
                  <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                    Password
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white pr-12 border border-[#333333] text-base pl-11"
                      placeholder="••••••••"
                      placeholderTextColor="#666666"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      style={{ fontWeight: "400" }}
                    />
                    <View className="absolute left-4 top-4">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#666666"
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4"
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#666666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={onSignUpPress}
                className="h-[52px] bg-white rounded-xl items-center justify-center mt-8 shadow-lg shadow-cyan-500/20"
              >
                <Text className="text-black font-bold text-base">
                  Create Account
                </Text>
              </TouchableOpacity>

              <View className="flex-row justify-center items-center mt-6 space-x-1">
                <Text className="text-white">Already have an account?</Text>
                <Link href="/sign-in" asChild>
                  <TouchableOpacity>
                    <Text className="text-white font-extrabold">Sign in</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </>
          )}

          {pendingVerification && (
            <View className="mt-14">
              <Text className="text-white text-[32px] font-bold mb-4">
                Verify Email
              </Text>
              <Text className="text-[#666666] text-base mb-8">
                Please enter the verification code sent to your email
              </Text>
              <View className="relative">
                <TextInput
                  value={code}
                  placeholder="Enter verification code"
                  onChangeText={setCode}
                  className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base pl-11"
                  placeholderTextColor="#666666"
                  style={{ fontWeight: "400" }}
                  keyboardType="number-pad"
                />
                <View className="absolute left-4 top-4">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#666666"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={onPressVerify}
                className="h-[52px] bg-white rounded-xl items-center justify-center mt-4 shadow-lg shadow-cyan-500/20"
              >
                <Text className="text-black font-bold text-base">
                  Verify Email
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
