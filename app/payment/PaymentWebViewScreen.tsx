import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";

export default function PaymentWebViewScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Since orderData is passed as a JSON string, deserialize it
  const { orderData: orderDataString } = route.params as { orderData: string };
  const orderData = JSON.parse(orderDataString) as {
    razorpayOrder: { id: string; amount: number; currency: string };
    orderId: string;
  };

  // Dynamically generate the HTML content for the Razorpay checkout.
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          var options = {
            "key": "${process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || ""}",
            "amount": "${orderData.razorpayOrder.amount}", 
            "currency": "${orderData.razorpayOrder.currency}",
            "name": "Drobb",
            "description": "Order Payment",
            "order_id": "${orderData.razorpayOrder.id}",
            "prefill": {
                "name": "User Name",
                "email": "user@example.com",
                "contact": "9999999999"
            },
            "theme": {
                "color": "#000"
            },
            "handler": function (response) {
              // Send payment details back to React Native app
              window.ReactNativeWebView.postMessage(JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }));
            },
            "modal": {
              "ondismiss": function(){
                // Notify the React Native app that the payment modal was dismissed.
                window.ReactNativeWebView.postMessage(JSON.stringify({ cancelled: true }));
              }
            }
          };
          var rzp = new Razorpay(options);
          rzp.open();
        </script>
      </body>
    </html>
  `;

  // Listen for messages from the WebView.
  const onMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.cancelled) {
        Toast.show({
          type: "error",
          text1: "Payment Cancelled",
          text2: "Payment was cancelled by user",
        });
        navigation.goBack();
        return;
      }
      // Payment details have been received—proceed to verify the payment with your backend.
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "User not logged in",
        });
        navigation.goBack();
        return;
      }
      const verifyPayload = {
        razorpay_order_id: orderData.razorpayOrder.id,
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
        orderId: orderData.orderId,
      };

      await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/verify`,
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
      // After a successful transaction, navigate to home
      router.push("/home");
    } catch (error) {
      console.error("Payment verification error: ", error);
      Toast.show({
        type: "error",
        text1: "Payment Verification Failed",
        text2: "There was an error verifying the payment",
      });
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        onMessage={onMessage}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator style={styles.loadingIndicator} size="large" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
