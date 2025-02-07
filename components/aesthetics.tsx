import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export type AestheticType =
  | "STAR_GIRL"
  | "SGANDI"
  | "INDIE"
  | "Y2K"
  | "OLD_MONEY"
  | "ALT"
  | "COTTAGECORE"
  | "DOWNTOWN";

interface AestheticsProps {
  aesthetics: string[];
  setAesthetics: (aesthetics: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const aestheticStyles = [
  {
    id: 1,
    name: "STAR_GIRL",
    displayName: "Star Girl",
    image:
      "https://images.unsplash.com/photo-1618721405821-80ebc4b63d26?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "SGANDI",
    displayName: "Sgandi",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "INDIE",
    displayName: "Indie",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Y2K",
    displayName: "Y2K",
    image:
      "https://images.unsplash.com/photo-1541779408-c355f91b42c9?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "OLD_MONEY",
    displayName: "Old Money",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "ALT",
    displayName: "Alt",
    image:
      "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    name: "COTTAGECORE",
    displayName: "Cottagecore",
    image:
      "https://images.unsplash.com/photo-1595781572981-d63151b232ed?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    name: "DOWNTOWN",
    displayName: "Downtown",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60",
  },
];

export function Aesthetics({
  aesthetics,
  setAesthetics,
  onBack,
  onNext,
}: AestheticsProps) {
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

          <TouchableOpacity
            onPress={onBack}
            className="mt-14 w-9 h-9 rounded-full bg-[#1A1A1A]/50 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={20} color="#666666" />
          </TouchableOpacity>

          <View className="mt-8">
            <Text className="text-white text-[40px] font-bold leading-10 tracking-wide">
              Choose Your
            </Text>
            <Text className="text-white text-[40px] font-bold leading-10 tracking-wide mt-1">
              Aesthetic
            </Text>
            <Text className="text-[#666666] text-base mt-3">
              Select your preferred aesthetic for personalized recommendations
            </Text>
          </View>

          <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
            <Text className="text-white text-xl font-bold mb-4">
              Select Aesthetics
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {aestheticStyles.map((style) => (
                <TouchableOpacity
                  key={style.id}
                  onPress={() => {
                    if (aesthetics.includes(style.name as AestheticType)) {
                      setAesthetics(aesthetics.filter((a) => a !== style.name));
                    } else {
                      setAesthetics([
                        ...aesthetics,
                        style.name as AestheticType,
                      ]);
                    }
                  }}
                  className={`w-[48%] aspect-square mb-4 rounded-2xl overflow-hidden ${
                    aesthetics.includes(style.name as AestheticType)
                      ? "border-2 border-white"
                      : ""
                  }`}
                >
                  <Image
                    source={{ uri: style.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    className="absolute bottom-0 left-0 right-0 h-1/2 z-10"
                  />
                  <Text className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium z-20 text-center">
                    {style.displayName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={onNext}
            className="bg-white h-[52px] rounded-xl items-center justify-center my-4"
          >
            <Text className="text-black font-semibold text-base">Next</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
