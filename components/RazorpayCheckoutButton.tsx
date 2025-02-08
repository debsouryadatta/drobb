import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface RazorpayCheckoutButtonProps {
  orderData: {
    razorpayOrder: {
      id: string;
      amount: number;
      currency: string;
    };
    orderId: string;
  };
}

export default function RazorpayCheckoutButton({
  orderData,
}: RazorpayCheckoutButtonProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  const handlePayment = () => {
    // Navigate to the payment screen using the correct route path
    // Pass orderData as a JSON string since only primitives are allowed
    router.push({
      pathname: "/payment/PaymentWebViewScreen",
      params: { orderData: JSON.stringify(orderData) },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePayment}
      disabled={isProcessing}
      className="bg-black py-4 rounded-full shadow-sm active:bg-gray-800"
    >
      <View className="flex-row justify-center items-center space-x-2">
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text className="text-white text-center font-semibold text-lg">
              Pay ₹{(orderData.razorpayOrder.amount / 100).toFixed(2)}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
