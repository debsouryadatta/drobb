import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "User not logged in",
        });
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/order/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Fetching orders error:", err);
      Toast.show({
        type: "error",
        text1: "Order Error",
        text2: "Unable to fetch orders",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">No orders found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="bg-gray-100 p-4 rounded-lg m-2">
          <Text className="text-lg font-bold mb-1">Order ID: {item.id}</Text>
          <Text className="text-base mb-1">Status: {item.status}</Text>
          <Text className="text-base mb-1">Total: ₹{item.total}</Text>
          <Text className="text-base">
            Ordered on: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    />
  );
}
