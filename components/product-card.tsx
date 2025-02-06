import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

type ProductCardProps = {
  product: any;
  onBookmark?: () => void;
};

export default function ProductCard({ product, onBookmark }: ProductCardProps) {
  return (
    <View className="bg-white rounded-xl overflow-hidden h-[75vh] border border-gray-200">
      <Image
        source={{ uri: product?.images[0] }}
        className="w-full h-[60vh]"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-xl font-medium mb-1">{product?.name || 'Product Name'}</Text>
        <Text className="text-gray-600 mb-2">{product?.aesthetic || 'Product Aesthetic'}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">₹{product?.price || 'Price'}</Text>
          <TouchableOpacity onPress={onBookmark}>
            <Text className="text-2xl">☆</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
