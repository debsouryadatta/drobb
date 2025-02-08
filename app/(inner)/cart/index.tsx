import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useRouter } from "expo-router";

const SIZES = ["XS", "S", "M", "L", "XL"]; // Standard sizes
const NUMBERED_SIZES = ["24", "26", "28", "30", "32"]; // For jeans

interface CartItem {
  id: string;
  quantity: number;
  size: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    images: string[];
  };
  estimatedDelivery?: string;
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showSizes, setShowSizes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "User not logged in",
        });
        setIsLoading(false);
        return;
      }
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/cart/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data.items);
    } catch (error) {
      console.error("Error fetching cart", error);
      Toast.show({
        type: "error",
        text1: "Cart Error",
        text2: "Unable to fetch cart items",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  // Clear the cart (local state update).
  const clearCart = () => {
    setCartItems([]);
  };

  // Remove a cart item by calling the DELETE /remove/:cartItemId endpoint.
  const removeCartItem = async (cartItemId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "User not logged in",
        });
        return;
      }
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/cart/remove/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Removed",
        text2: "Cart item removed successfully",
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing cart item", error);
      Toast.show({
        type: "error",
        text1: "Remove Failed",
        text2: "Could not remove cart item",
      });
    }
  };

  // Update quantity locally (ensure quantity is never less than 1).
  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Update the size for a cart item.
  const updateSize = (id: string, newSize: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, size: newSize };
        }
        return item;
      })
    );
    setShowSizes(null);
  };

  // Navigate to CheckoutScreen (which includes order summary)
  const handleCheckout = () => {
    router.push("/order/CheckoutScreen");
  };

  // Calculate the subtotal of the cart.
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="h-full">
        <StatusBar style="dark" />

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200 mt-2">
          <TouchableOpacity onPress={clearCart}>
            <Text className="text-black font-medium">Clear</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-extrabold">My Cart</Text>
          <TouchableOpacity>
            <Text className="text-black font-medium">FAQs</Text>
          </TouchableOpacity>
        </View>

        {/* Subtotal */}
        <View className="px-4 py-3 mt-4 border-b border-gray-200">
          <Text className="text-base font-normal">
            Subtotal: <Text className="font-bold">₹{subtotal}</Text>
          </Text>
        </View>

        {/* Cart Items */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: insets.bottom + 200,
          }}
        >
          {cartItems.length === 0 ? (
            <Text className="text-center text-gray-600 mt-4">
              Your cart is empty
            </Text>
          ) : (
            cartItems.map((item) => (
              <View
                key={item.id}
                className="flex-row p-4 border-b border-gray-200"
              >
                <Image
                  source={{ uri: item.product.images[0] }}
                  className="w-24 h-32 rounded-lg"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-lg font-medium">
                        {item.product.name}
                      </Text>
                      <Text className="text-gray-600 mb-2">
                        {item.product.brand}
                      </Text>
                      <Text className="font-medium">
                        ₹{item.product.price * item.quantity}
                      </Text>
                    </View>
                    {/* Remove button with added margin */}
                    <TouchableOpacity
                      onPress={() => removeCartItem(item.id)}
                      className="ml-4"
                    >
                      <Ionicons name="trash-outline" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>

                  {/* Size Selector */}
                  <View className="mt-2">
                    <Text className="text-gray-600 mb-1">Select a size:</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setShowSizes(showSizes === item.id ? null : item.id)
                      }
                      className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2"
                    >
                      <Text>Size:</Text>
                      <View className="flex-row items-center flex-1 justify-between ml-2">
                        <Text>{item.size}</Text>
                        <Ionicons
                          name={
                            showSizes === item.id
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={16}
                          color="#666"
                        />
                      </View>
                    </TouchableOpacity>

                    {/* Size Options Dropdown */}
                    {showSizes === item.id && (
                      <View className="mt-2 bg-white rounded-lg p-2 border border-gray-300 shadow-sm">
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          {(item.product.name.toLowerCase().includes("jeans")
                            ? NUMBERED_SIZES
                            : SIZES
                          ).map((size) => (
                            <TouchableOpacity
                              key={size}
                              onPress={() => updateSize(item.id, size)}
                              className={`px-4 py-2 rounded-lg mr-2 ${
                                item.size === size ? "bg-black" : "bg-white"
                              }`}
                            >
                              <Text
                                className={
                                  item.size === size
                                    ? "text-white"
                                    : "text-black"
                                }
                              >
                                {size}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>

                  {/* Quantity */}
                  <View className="flex-row items-center mt-3">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center"
                    >
                      <Text className="text-lg">-</Text>
                    </TouchableOpacity>
                    <Text className="mx-4">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center"
                    >
                      <Text className="text-lg">+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Estimated Delivery */}
                  {item.estimatedDelivery && (
                    <View className="flex-row items-center mt-3">
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text className="text-gray-600 text-sm ml-1">
                        Estimated arrival {item.estimatedDelivery}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Enhanced Bottom Action Button */}
        <View
          style={{ bottom: insets.bottom + 85 }}
          className="absolute left-0 right-0 bg-white p-4 border-t border-gray-200"
        >
          {cartItems.length > 0 ? (
            <View className="space-y-3">
              {/* Order Summary */}
              <View className="space-y-2 mb-2">
                <View className="flex-row justify-between">
                  <Text className="text-base font-normal">Subtotal</Text>
                  <Text className="font-bold text-base">₹{subtotal}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-base font-normal">Delivery</Text>
                  <Text className="font-bold text-base">
                    ₹{subtotal > 1000 ? "0" : "99"}
                  </Text>
                </View>
                <View className="flex-row justify-between pt-2 border-t border-gray-200">
                  <Text className="font-bold text-base">Total</Text>
                  <Text className="font-bold text-base">
                    ₹{subtotal > 1000 ? subtotal : subtotal + 99}
                  </Text>
                </View>
              </View>

              {/* Proceed to Checkout Button */}
              <TouchableOpacity
                onPress={handleCheckout}
                className="bg-black py-4 rounded-full shadow-sm active:bg-gray-800"
              >
                <View className="flex-row justify-center items-center space-x-2">
                  <Text className="text-white text-center font-semibold text-lg">
                    Proceed to Checkout
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            // Empty Cart Action: Continue Shopping only
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="bg-black py-4 rounded-full shadow-sm active:bg-gray-800"
            >
              <View className="flex-row justify-center items-center space-x-2">
                <Text className="text-white text-center font-semibold">
                  Continue Shopping
                </Text>
                <Ionicons name="cart-outline" size={20} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
