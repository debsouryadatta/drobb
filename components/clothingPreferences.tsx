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

interface ClothingPreferencesProps {
  clothing: string[];
  setClothing: (clothing: string[]) => void;
  onBack: () => void;
  onComplete: () => void;
}

const clothingCategories = [
  {
    id: 1,
    name: "T-Shirts",
    displayName: "T-Shirts",
    image:
      "https://imgs.search.brave.com/Q8N1hgmCdmKvrapcnNXYFu1xDCgiw1XzYJiQ7ory7VI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzkxLzcxLzg5/LzM2MF9GXzk5MTcx/ODk0M19EVlo5RzJD/SG40NjJlaVVnMmpH/dklCQzNycDNrOElT/WS5qcGc",
  },
  {
    id: 2,
    name: "Dresses",
    displayName: "Dresses",
    image:
      "https://imgs.search.brave.com/SnTuo-fxuGKQLbBTFo4SUfCgf_lsVNLdTMXjr-jinME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudm9ndWUuY29t/L3Bob3Rvcy82NzM2/NmYwNDgzYzBkNTNk/NzUxNzQ1ZjQvMzo0/L3dfNzQ4LGNfbGlt/aXQvUGFydHklMjBE/cmVzc2VzX1NsaWRl/c18wMDA0X3c5MjBf/YTMtNF9xNjAuanBn",
  },

  {
    id: 3,
    name: "Jeans",
    displayName: "Jeans",
    image:
      "https://imgs.search.brave.com/N1Qse1_D2hxcYCfEeqGSkM9BUZTof05cfwEh25UzXGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA4/MzgvNDQ0MS9wcm9k/dWN0cy9tYXJuZS1i/b290Y3V0LWplYW5z/LTMyLWluY2hfZGFy/ay1pbmRpZ29fVVNQ/QTAyNTEtMDA4XzEw/MjR4LmpwZz92PTE2/NjkyNDcwMzc",
  },
  {
    id: 4,
    name: "Sweaters",
    displayName: "Sweaters",
    image:
      "https://imgs.search.brave.com/YBj7mQEZSQEcR4-9Pz7iGfq8S0qugdzuG7-33yDi5rk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ExL2U5/LzhiL2ExZTk4YmE3/YzRmMGFjZGEwNDEz/YzA4MzdkODkwOWM2/LmpwZw",
  },
  {
    id: 5,
    name: "Jackets",
    displayName: "Jackets",
    image:
      "https://imgs.search.brave.com/9Am-_cgeJZu2n7C5tJyNAbUVmWkSQl76aBjmg1gMd0w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMzky/MTM1MjUvc3RvY2st/cGhvdG8tamFja2V0.jpeg",
  },
  {
    id: 6,
    name: "Skirts",
    displayName: "Skirts",
    image:
      "https://media.istockphoto.com/id/1222215457/photo/blue-skirt-for-girl-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=Ogp6_yM1KsPvxwuFxh2smfdYHWMNPrd3YDbqzQ3RRbo=",
  },
  {
    id: 7,
    name: "Pants",
    displayName: "Pants",
    image:
      "https://media.gettyimages.com/id/186854841/photo/red-trousers.jpg?s=2048x2048&w=gi&k=20&c=AnSalt_uZDHri8GJI7QEx0O_vVv7fbpFDxTko8S4ULg=",
  },
  {
    id: 8,
    name: "Shorts",
    displayName: "Shorts",
    image:
      "https://imgs.search.brave.com/o1Uya69w25Cte7ru2rpIgPFvZUhvS05KKKajrVx1j4k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIz/Nzk4NTIzMS9waG90/by9zaG9ydHMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU8t/NTJZRjY4NEJ4ZUM4/RUdIdTlJNjh1akJ6/YVB1dWtZbkpyY2pz/aG1LYjQ9",
  },
];

export function ClothingPreferences({
  clothing,
  setClothing,
  onBack,
  onComplete,
}: ClothingPreferencesProps) {
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
              Clothing Preference
            </Text>
            <Text className="text-[#666666] text-base mt-3">
              Select your preferred clothing category
            </Text>
          </View>

          <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap justify-between">
              {clothingCategories.map((category) => {
                const selected = clothing.includes(category.name);
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => {
                      if (selected) {
                        setClothing(
                          clothing.filter((item) => item !== category.name)
                        );
                      } else {
                        setClothing([...clothing, category.name]);
                      }
                    }}
                    className={`w-[48%] aspect-square mb-4 rounded-2xl overflow-hidden ${
                      selected ? "border-2 border-white" : ""
                    }`}
                  >
                    <Image
                      source={{ uri: category.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      className="absolute bottom-0 left-0 right-0 h-1/2 z-10"
                    />
                    <Text className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium z-20 text-center">
                      {category.displayName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={onComplete}
            className="bg-white h-[52px] rounded-xl items-center justify-center my-4"
          >
            <Text className="text-black font-semibold text-base">Complete</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
