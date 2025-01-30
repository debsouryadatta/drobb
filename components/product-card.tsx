import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../lib/types';

type ProductCardProps = {
  product: Product;
  onBookmark?: () => void;
};

export default function ProductCard({ product, onBookmark }: ProductCardProps) {
  return (
    <View className="bg-white rounded-xl overflow-hidden h-[75vh] border border-gray-200">
      <Image
        source={{ uri: product.image }}
        className="w-full h-[60vh]"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-xl font-medium mb-1">{product.name}</Text>
        <Text className="text-gray-600 mb-2">{product.brand}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">${product.price}</Text>
          <TouchableOpacity onPress={onBookmark}>
            <Text className="text-2xl">☆</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
