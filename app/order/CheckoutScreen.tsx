import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import OrderSummary from "../../components/OrderSummary";
import RazorpayCheckoutButton from "../../components/RazorpayCheckoutButton";

export default function CheckoutScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    initiateOrder();
  }, []);

  const initiateOrder = async () => {
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
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/order/initiate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Response expected to include { razorpayOrder, orderId }
      setOrderData(response.data);
    } catch (error) {
      console.error("Initiating order error:", error);
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
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!orderData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">
          Unable to initiate payment
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <OrderSummary orderData={orderData} />
      <RazorpayCheckoutButton orderData={orderData} />
    </View>
  );
}
