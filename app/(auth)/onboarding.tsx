import React, { useState } from "react";
import { PersonalInfo } from "../../components/personalInfo";
import { Aesthetics } from "../../components/aesthetics";
import { ClothingPreferences } from "../../components/clothingPreferences";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aesthetics, setAesthetics] = useState<string[]>([]);
  const [clothing, setClothing] = useState<string[]>([]);
  const router = useRouter();

  const handleComplete = async () => {
    if (!name || !gender || !dob || !aesthetics.length || !clothing.length) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields",
      });
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token from storage:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      const profilePayload = {
        name,
        gender,
        birthDate: new Date(dob).toISOString(),
        aesthetic: aesthetics,
        bio: "",
        avatar: "",
        photos: [],
      };
      console.log("Profile update payload:", profilePayload);

      const profileResponse = await axios.put(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/profile/update`,
        profilePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile response:", profileResponse.data);

      const preferencesPayload = {
        aesthetics: aesthetics.map((a) => a.toUpperCase()),
        clothingTypes: clothing.map((c) => c.toUpperCase()),
      };
      console.log("Preferences payload:", preferencesPayload);

      const preferenceResponse = await axios.put(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/profile/preferences`,
        preferencesPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Preferences response:", preferenceResponse.data);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Onboarding completed",
      });
      router.replace("/home");
    } catch (error: any) {
      console.log("Full error details:", {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        token: await AsyncStorage.getItem("token"),
      });

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Error submitting onboarding",
      });
    }
  };

  return step === 1 ? (
    <PersonalInfo
      name={name}
      setName={setName}
      dob={dob}
      setDob={setDob}
      gender={gender}
      setGender={setGender}
      onNext={() => setStep(2)}
    />
  ) : step === 2 ? (
    <Aesthetics
      aesthetics={aesthetics}
      setAesthetics={setAesthetics}
      onBack={() => setStep(1)}
      onNext={() => setStep(3)}
    />
  ) : (
    <ClothingPreferences
      clothing={clothing}
      setClothing={setClothing}
      onBack={() => setStep(2)}
      onComplete={handleComplete}
    />
  );
}
