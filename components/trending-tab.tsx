import { View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const fashionImages = [
  // 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  // 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800',
  // 'https://images.unsplash.com/photo-1630759072462-d5348e577ee4?w=800',
  // 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  // 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800',
  // 'https://images.unsplash.com/photo-1617551307578-7f5159d61d61?w=800',
  'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=800',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800',
  'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800',
  'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800',
  'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800',
  'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800',
  'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800',
  'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800',
  'https://images.unsplash.com/photo-1576185066405-35dec9827e38?w=800',
  'https://images.unsplash.com/photo-1586078130702-d208859b6223?w=800',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
  'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=800',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
  'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800',
  'https://images.unsplash.com/photo-1536243298547-ea894c31391d?w=800',
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800',
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800'
]

const { width } = Dimensions.get('window')
const gap = 2
const itemPerRow = 3
const totalGapSize = (itemPerRow - 1) * gap
const imageSize = (width - 32 - totalGapSize) / itemPerRow // 32 is for padding (16 * 2)

export function TrendingTab() {
  const handlePress = (index: number) => {
    // Handle image press - can add navigation or modal view here
    console.log('Image pressed:', index)
  }

  return (
    <ScrollView 
      className="flex-1 bg-white" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row flex-wrap gap-0.5">
          {fashionImages.map((image, index) => (
            <TouchableOpacity 
              key={index}
              style={{ width: imageSize, height: imageSize * 1.5 }}
              className="mb-0.5"
              activeOpacity={0.7}
              onPress={() => handlePress(index)}
            >
              <Image
                source={{ uri: image }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
