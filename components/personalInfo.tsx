import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface PersonalInfoProps {
  name: string;
  setName: (name: string) => void;
  dob: string;
  setDob: (dob: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  onNext: () => void;
}

export function PersonalInfo({
  name,
  setName,
  dob,
  setDob,
  gender,
  setGender,
  onNext,
}: PersonalInfoProps) {
  // Add date validation
  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
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

          <View className="mt-14">
            <Text className="text-white text-[40px] font-bold leading-10 tracking-wide">
              Tell us about
            </Text>
            <Text className="text-white text-[40px] font-bold leading-10 tracking-wide mt-1">
              Yourself
            </Text>
            <Text className="text-[#666666] text-base mt-3">
              Let's get to know you better
            </Text>
          </View>

          <View className="space-y-5 mt-12">
            <View>
              <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                Name
              </Text>
              <View className="relative">
                <TextInput
                  className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base pl-11"
                  placeholder="Enter your name"
                  placeholderTextColor="#666666"
                  value={name}
                  onChangeText={setName}
                />
                <View className="absolute left-4 h-full justify-center">
                  <Ionicons name="person-outline" size={20} color="#666666" />
                </View>
              </View>
            </View>

            <View>
              <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                Date of Birth
              </Text>
              <View className="relative">
                <TextInput
                  className="h-[52px] bg-[#1A1A1A]/50 rounded-xl px-4 text-white border border-[#333333] text-base pl-11"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#666666"
                  value={dob}
                  onChangeText={(text) => {
                    if (text.length <= 10) {
                      setDob(text);
                    }
                  }}
                  keyboardType="numbers-and-punctuation"
                />
                <View className="absolute left-4 h-full justify-center">
                  <Ionicons name="calendar-outline" size={20} color="#666666" />
                </View>
              </View>
            </View>

            <View>
              <Text className="text-[#666666] text-[15px] mb-2.5 font-medium">
                Gender
              </Text>
              <View className="flex-row space-x-2">
                {["MALE", "FEMALE", "NON_BINARY", "OTHER"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setGender(option)}
                    className={`flex-1 h-[52px] rounded-xl items-center justify-center ${
                      gender === option
                        ? "bg-white"
                        : "bg-[#1A1A1A]/50 border border-[#333333]"
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        gender === option ? "text-black" : "text-white"
                      }`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={onNext}
            className="bg-white h-[52px] rounded-xl items-center justify-center mt-8"
          >
            <Text className="text-black font-semibold text-base">Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
