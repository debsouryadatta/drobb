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

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

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

        {/* Available Sizes */}
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800">
            Available Sizes
          </Text>
          <View className="flex-row mt-2 space-x-3">
            {product.size.map((s: string, index: number) => (
              <View
                key={index}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <Text className="text-gray-700">{s}</Text>
              </View>
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
        <TouchableOpacity className="mt-8 bg-blue-600 py-4 rounded-xl shadow-md">
          <Text className="text-center text-white text-lg font-bold">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
