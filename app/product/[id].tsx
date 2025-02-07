import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // New state: selected size for the product.
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // New state: cart items retrieved from the server.
  const [cartItems, setCartItems] = useState<any[]>([]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${id}`
      );
      setProduct(response.data.product);
      // Optionally, set a default size if available (e.g. the first available size)
      if (
        response.data.product &&
        response.data.product.size &&
        response.data.product.size.length > 0
      ) {
        setSelectedSize(response.data.product.size[0]);
      }
    } catch (error) {
      console.error("Error fetching product details", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items from the backend (using the GET /api/cart endpoint)
  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
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
      // Our backend sends back an "items" array in the JSON response.
      setCartItems(response.data.items);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
      fetchCart();
    }
  }, [id]);

  // Add to Cart function that calls the POST /api/cart/add endpoint.
  const addToCart = async () => {
    if (!selectedSize) {
      Toast.show({
        type: "error",
        text1: "Size not selected",
        text2: "Please select a size before adding to cart",
      });
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication error",
          text2: "User not logged in",
        });
        return;
      }
      const payload = {
        productId: product.id,
        quantity: 1, // You can later make this dynamic
        size: selectedSize,
      };
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/cart/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Cart Updated",
        text2: response.data.message,
      });
      // Refresh cart items after a successful cart update.
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart", error);
      Toast.show({
        type: "error",
        text1: "Add to Cart Failed",
        text2: "There was a problem adding the item to your cart",
      });
    }
  };

  // Remove cart item using the DELETE endpoint.
  const removeCartItem = async (cartItemId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication error",
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
      // Refresh cart items after removal.
      fetchCart();
    } catch (error) {
      console.error("Error removing cart item", error);
      Toast.show({
        type: "error",
        text1: "Remove failed",
        text2: "Could not remove cart item",
      });
    }
  };

  // Helper function to calculate the subtotal of the cart.
  const calculateCartSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.product.price);
      return sum + price * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl">Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Hero Image with Overlay Controls */}
      <View className="relative">
        <Image
          source={{ uri: product.images[0] }}
          className="w-full h-96"
          resizeMode="cover"
        />
        {/* Back and Favorite Buttons */}
        <View className="absolute top-10 left-4 right-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white p-2 rounded-full shadow-md"
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white p-2 rounded-full shadow-md">
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4 py-6">
        {/* Product Title & Price */}
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-gray-800 flex-1">
            {product.name}
          </Text>
          <Text className="text-2xl font-semibold text-blue-600 ml-4">
            ₹{product.price}
          </Text>
        </View>

        {/* Horizontal Thumbnail Gallery */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {product.images.map((imgUrl: string, index: number) => (
            <Image
              key={index}
              source={{ uri: imgUrl }}
              className="w-40 h-40 rounded-lg mr-4 border border-gray-200"
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Aesthetic Tags */}
        <View className="flex-row mt-4">
          {product.aesthetic.map((tag: string, index: number) => (
            <View
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 mr-2"
            >
              <Text className="text-sm font-medium text-gray-700">{tag}</Text>
            </View>
          ))}
        </View>

        {/* Product Description */}
        <Text className="text-gray-700 mt-4 leading-6">
          {product.description}
        </Text>

        {/* Category */}
        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800">Category</Text>
          <Text className="text-gray-600 mt-1">{product.category}</Text>
        </View>

        {/* Available Sizes (selectable) */}
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800">
            Available Sizes
          </Text>
          <View className="flex-row mt-2 space-x-3">
            {product.size.map((s: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedSize(s)}
                className={`border border-gray-300 rounded-lg px-4 py-2 ${
                  selectedSize === s ? "bg-blue-600" : "bg-white"
                }`}
              >
                <Text
                  className={
                    selectedSize === s ? "text-white" : "text-gray-700"
                  }
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stock Status */}
        <View className="mt-6">
          <Text className="text-base text-gray-500">
            In Stock: {product.inStock ? "Yes" : "No"}
          </Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={addToCart}
          className="mt-8 bg-blue-600 py-4 rounded-xl shadow-md"
        >
          <Text className="text-center text-white text-lg font-bold">
            Add to Cart
          </Text>
        </TouchableOpacity>

        {/* Display Cart Items and Total Price */}
        <View className="mt-8">
          <Text className="text-2xl font-bold mb-4">Your Cart</Text>
          {cartItems.length === 0 ? (
            <Text className="text-gray-600">Cart is empty</Text>
          ) : (
            cartItems.map((item: any) => (
              <View
                key={item.id}
                className="flex-row items-center mb-4 border-b border-gray-200 pb-2"
              >
                <Image
                  source={{ uri: item.product.images[0] }}
                  className="w-16 h-16 rounded-lg"
                  resizeMode="cover"
                />
                <View className="ml-4 flex-1">
                  <Text className="text-lg font-medium">
                    {item.product.name}
                  </Text>
                  <Text className="text-gray-600">Size: {item.size}</Text>
                  <Text className="text-gray-600">Qty: {item.quantity}</Text>
                </View>
                <Text className="font-semibold">
                  ₹{Number(item.product.price) * item.quantity}
                </Text>
                {/* Remove button */}
                <TouchableOpacity
                  onPress={() => removeCartItem(item.id)}
                  className="ml-2"
                >
                  <Ionicons name="trash-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))
          )}
          {cartItems.length > 0 && (
            <View className="mt-4 border-t border-gray-200 pt-4">
              <Text className="text-xl font-bold">
                Total: ₹{calculateCartSubtotal()}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}