import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

type ProductCardProps = {
  product: any;
  onBookmark?: () => void;
  onPress?: () => void;
};

export default function ProductCard({
  product,
  onBookmark,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className="bg-white rounded-xl overflow-hidden h-[75vh] border border-gray-200">
        <View className="relative">
          <Image
            source={{ uri: product?.images[0] }}
            className="w-full h-[60vh]"
            resizeMode="cover"
          />
          <View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded">
            <Text className="text-white text-xs">
              ID: {product?.id.slice(-4)}
            </Text>
          </View>
        </View>
        <View className="p-4">
          <Text className="text-xl font-medium mb-1">
            {product?.name || "Product Name"}
          </Text>
          <Text className="text-gray-600 mb-2">
            {product?.aesthetic?.join(", ") || "Product Aesthetic"}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold">
              ₹{product?.price || "Price"}
            </Text>
            <TouchableOpacity onPress={onBookmark}>
              <Text className="text-2xl">☆</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
