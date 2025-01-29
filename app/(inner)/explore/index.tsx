import { View, Text, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TrendingTab } from '../../../components/trending-tab'
import { BrandsTab } from '../../../components/brands-tab'

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<'trending' | 'brands'>('trending')

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header Tabs */}
      <View className="flex-row border-b border-gray-200">
        <Pressable 
          onPress={() => setActiveTab('trending')}
          className={`flex-1 py-4 ${activeTab === 'trending' ? 'border-b-2 border-black' : ''}`}
        >
          <Text className={`text-center text-lg ${activeTab === 'trending' ? 'font-semibold' : 'text-gray-500'}`}>
            Trending
          </Text>
        </Pressable>
        
        <Pressable 
          onPress={() => setActiveTab('brands')}
          className={`flex-1 py-4 ${activeTab === 'brands' ? 'border-b-2 border-black' : ''}`}
        >
          <Text className={`text-center text-lg ${activeTab === 'brands' ? 'font-semibold' : 'text-gray-500'}`}>
            Brands
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      {activeTab === 'trending' ? <TrendingTab /> : <BrandsTab />}
    </SafeAreaView>
  )
}