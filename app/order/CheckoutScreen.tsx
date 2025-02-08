import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import OrderSummary from "../../components/OrderSummary";
import RazorpayCheckoutButton from "../../components/RazorpayCheckoutButton";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    initiateOrder();
  }, []);

  const initiateOrder = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "User not logged in",
        });
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/initiate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Expected response: { razorpayOrder, orderId }
      setOrderData(response.data);
    } catch (error) {
      console.error(
        "Initiating order error:",
        (error as any).response?.data || error
      );
      Toast.show({
        type: "error",
        text1: "Order Error",
        text2: "Failed to initiate order",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!orderData) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-600">
          Unable to initiate payment
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white shadow">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-1 p-4">
          <OrderSummary orderData={orderData} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Payment Section */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-base">Total Amount</Text>
          <Text className="text-xl font-bold">
            ₹{(orderData.razorpayOrder.amount / 100).toFixed(2)}
          </Text>
        </View>
        <RazorpayCheckoutButton orderData={orderData} />
      </View>
    </SafeAreaView>
  );
}
