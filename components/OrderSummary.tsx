import React from "react";
import { View, Text } from "react-native";

interface OrderSummaryProps {
  orderData: {
    razorpayOrder: {
      id: string;
      amount: number;
      currency: string;
    };
    orderId: string;
  };
}

export default function OrderSummary({ orderData }: OrderSummaryProps) {
  return (
    <View className="bg-gray-100 p-4 rounded-lg mb-6">
      <Text className="text-xl font-bold mb-2">Order Summary</Text>
      <Text className="text-base mb-1">Order ID: {orderData.orderId}</Text>
      <Text className="text-base mb-1">
        Amount: ₹{orderData.razorpayOrder.amount / 100}
      </Text>
      <Text className="text-base">
        Currency: {orderData.razorpayOrder.currency}
      </Text>
    </View>
  );
}
