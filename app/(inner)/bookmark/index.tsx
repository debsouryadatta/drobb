import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import ProductCard from "../../../components/product-card";

export default function BookmarkScreen() {
  const router = useRouter();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/match`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMatches(response.data.matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh bookmarks every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchMatches();
    }, [])
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {matches.length === 0 ? (
        <View className="items-center">
          <Text className="text-xl text-gray-600">No matches found</Text>
        </View>
      ) : (
        matches.map((match) => (
          <View key={match.id} className="mb-4">
            <ProductCard
              product={match.product}
              onPress={() =>
                router.push(`/product/${match.product.id}?reload=${Date.now()}`)
              }
            />
          </View>
        ))
      )}
    </ScrollView>
  );
}
