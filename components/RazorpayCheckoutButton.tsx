import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
// @ts-ignore: No type declarations available for react-native-razorpay
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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

  const handlePayment = () => {
    const options = {
      description: "Order Payment",
      image: "https://your_image_url.com/logo.png", // Replace with your logo URL
      currency: orderData.razorpayOrder.currency,
      key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || "",
      amount: orderData.razorpayOrder.amount,
      name: "Your App Name",
      order_id: orderData.razorpayOrder.id,
      prefill: {
        email: "user@example.com", // Pre-fill details if available
        contact: "9999999999",
        name: "User Name",
      },
      theme: { color: "#F37254" },
    };

    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        setIsProcessing(true);
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) {
            Toast.show({
              type: "error",
              text1: "Authentication Error",
              text2: "User not logged in",
            });
            setIsProcessing(false);
            return;
          }
          const verifyPayload = {
            razorpay_order_id: orderData.razorpayOrder.id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            orderId: orderData.orderId,
          };

          await axios.post(
            `${process.env.EXPO_PUBLIC_BASE_URL}/api/order/verify`,
            verifyPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          Toast.show({
            type: "success",
            text1: "Payment Successful",
            text2: "Your order has been placed",
          });
        } catch (error) {
          console.error("Verification error:", error);
          Toast.show({
            type: "error",
            text1: "Verification Failed",
            text2: "Payment verification failed",
          });
        } finally {
          setIsProcessing(false);
        }
      })
      .catch((error: any) => {
        console.error("Payment error: ", error);
        Toast.show({
          type: "error",
          text1: "Payment Error",
          text2: "Payment was not completed",
        });
      });
  };

  return (
    <TouchableOpacity
      onPress={handlePayment}
      className="bg-orange-500 py-4 rounded-lg justify-center items-center"
      disabled={isProcessing}
    >
      {isProcessing ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-xl font-bold">Pay Now</Text>
      )}
    </TouchableOpacity>
  );
}
