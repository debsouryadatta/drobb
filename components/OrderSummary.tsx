import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    <View className="w-[92%] self-center bg-white rounded-2xl overflow-hidden mb-6 shadow-lg">
      {/* Enhanced Header with Pattern */}
      <LinearGradient
        colors={["#000000", "#1C1C1C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 py-10 items-center"
      >
        <View className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 justify-center items-center shadow-2xl">
          <Ionicons name="receipt" size={28} color="#fff" />
        </View>
        <Text className="mt-4 text-3xl text-white font-bold tracking-wide">
          Order Summary
        </Text>
        <Text className="mt-2 text-gray-300 text-sm">Transaction Details</Text>
      </LinearGradient>

      {/* Main Content */}
      <View className="p-8">
        {/* Order Details Cards */}
        <View className="flex-row justify-between space-x-4">
          {/* Order ID Card */}
          <View className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <View className="bg-black/5 w-10 h-10 rounded-full items-center justify-center mb-3">
              <Ionicons name="id-card-outline" size={20} color="#000" />
            </View>
            <Text className="text-xs text-gray-500 uppercase tracking-wider">
              Order Reference
            </Text>
            <Text className="text-sm font-bold text-black mt-1 break-all">
              {orderData.orderId}
            </Text>
          </View>

          {/* Amount Card */}
          <View className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <View className="bg-black/5 w-10 h-10 rounded-full items-center justify-center mb-3">
              <Ionicons name="pricetag-outline" size={20} color="#000" />
            </View>
            <Text className="text-xs text-gray-500 uppercase tracking-wider">
              Amount
            </Text>
            <Text className="text-sm font-bold text-black mt-1">
              ₹{(orderData.razorpayOrder.amount / 100).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Additional Details */}
        <View className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-black/5 w-10 h-10 rounded-full items-center justify-center">
                <Ionicons name="wallet-outline" size={20} color="#000" />
              </View>
              <View className="ml-3">
                <Text className="text-xs text-gray-500 uppercase tracking-wider">
                  Currency
                </Text>
                <Text className="text-sm font-bold text-black mt-1">
                  {orderData.razorpayOrder.currency}
                </Text>
              </View>
            </View>
            <View className="bg-black/5 px-4 py-2 rounded-full">
              <Text className="text-xs font-medium">Pending Payment</Text>
            </View>
          </View>
        </View>

        {/* Status Timeline */}
        <View className="mt-8">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded-full bg-green-500" />
            <View className="h-[1px] flex-1 bg-gray-200" />
            <View className="w-3 h-3 rounded-full bg-gray-300" />
            <View className="h-[1px] flex-1 bg-gray-200" />
            <View className="w-3 h-3 rounded-full bg-gray-300" />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-gray-500">Cart Review</Text>
            <Text className="text-xs text-gray-500">Payment</Text>
            <Text className="text-xs text-gray-500">Confirmation</Text>
          </View>
        </View>

        {/* Payment Instructions */}
        <View className="mt-8 items-center bg-gray-50 p-6 rounded-xl border border-gray-100">
          <View className="w-12 h-12 rounded-full bg-black items-center justify-center mb-4">
            <Ionicons name="card" size={24} color="#fff" />
          </View>
          <Text className="text-lg font-bold text-black">
            Ready for Payment
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2">
            Please proceed with the payment to complete your order
          </Text>
        </View>
      </View>
    </View>
  );
}
