import React, { useState } from "react";
import { PersonalInfo } from "../../components/personalInfo";
import { Aesthetics } from "../../components/aesthetics";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [aesthetics, setAesthetics] = useState<string[]>([]);
  const router = useRouter();

  const handleComplete = async () => {
    if(!name || !gender || !aesthetics.length){
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields"
      })
      return;
    }
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.put(`${process.env.EXPO_PUBLIC_BASE_URL}/api/profile/update`, {
            name,
            gender,
            aesthetic: aesthetics
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = response.data;
        console.log("Onboarding data:", data);
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Onboarding completed"
        })
        router.replace("/home");
    } catch (error) {
        console.log("Error submitting onboarding:", error);
        Toast.show({
            type: "error",
            text1: "Error",
            text2: "Error submitting onboarding"
        })
    }
  };

  return step === 1 ? (
    <PersonalInfo
      name={name}
      setName={setName}
      gender={gender}
      setGender={setGender}
      onNext={() => setStep(2)}
    />
  ) : (
    <Aesthetics
      aesthetics={aesthetics}
      setAesthetics={setAesthetics}
      onBack={() => setStep(1)}
      onComplete={handleComplete}
    />
  );
}