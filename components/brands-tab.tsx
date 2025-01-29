import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const brands = [
  {
    id: 1,
    name: 'Abercrombie & Fitch',
    image: 'https://images.unsplash.com/photo-1544965838-54ef8406f868?w=800'
  },
  {
    id: 2,
    name: 'ARITZIA',
    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=800'
  },
  {
    id: 3,
    name: 'BR',
    image: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?w=800'
  },
  {
    id: 4,
    name: 'beginning',
    image: 'https://images.unsplash.com/photo-1630953899906-d16511a72558?w=800'
  },
  {
    id: 5,
    name: 'Bershka',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800'
  },
  {
    id: 6,
    name: 'Brandy Melville',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'
  }
]

export function BrandsTab() {
  const handlePress = (brandId: number) => {
    console.log('Brand pressed:', brandId)
  }

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search for a brand..."
            placeholderTextColor="#999"
            className="flex-1 ml-2 text-base text-gray-800 focus:outline-none"
          />
        </View>
      </View>

      {/* Brands Grid */}
      <View className="px-4 flex-row flex-wrap justify-between">
        {brands.map((brand) => (
          <TouchableOpacity 
            key={brand.id}
            className="w-[48%] aspect-[4/3] mb-4 rounded-xl overflow-hidden"
            activeOpacity={0.7}
            onPress={() => handlePress(brand.id)}
          >
            <Image
              source={{ uri: brand.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Text className="text-white text-xl font-semibold text-center">
                {brand.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}
