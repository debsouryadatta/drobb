import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Product } from '../../../lib/types';
import ProductCard from '../../../components/product-card';
import FilterModal from '../../../components/filter-modal';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// Demo products with Unsplash images
const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalism Cotton Cami Dress',
    brand: 'Commense',
    price: 36,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80'
  },
  {
    id: '2',
    name: 'Pinstripe Boxer Shorts',
    brand: 'Edikted',
    price: 10,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80'
  },
  // Add more demo products as needed
];

export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const swiperRef = useRef<Swiper<any>>(null);
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View className="px-4 pb-4 mt-5">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => {
            swiperRef.current?.swipeBack()
            Toast.show({
              type: 'info',
              text1: 'Returning previous card',
              visibilityTime: 3000,
              autoHide: true,
            })
          }}>
            <Ionicons name="arrow-undo-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-1 mx-4">
            <TextInput
              placeholder="Looking for something specific?"
              className="bg-gray-100 px-4 py-2 rounded-full"
            />
          </View>
          <Text className="text-xl font-bold">drobb</Text>
        </View>

        {/* Filter buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="flex-row"
        >
          <View className="flex-row items-center space-x-2 px-1">
            <TouchableOpacity 
              className="bg-gray-100 p-2 rounded-full"
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="menu" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
              <Text>Sale</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-gray-100 px-4 py-2 rounded-full flex-row items-center"
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="shirt-outline" size={16} color="black" />
              <Text className="ml-1">Brand</Text>
              <Ionicons name="chevron-down" size={16} color="black" className="ml-1" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-gray-100 px-4 py-2 rounded-full flex-row items-center"
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="grid-outline" size={16} color="black" />
              <Text className="ml-1">Product</Text>
              <Ionicons name="chevron-down" size={16} color="black" className="ml-1" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-gray-100 px-4 py-2 rounded-full flex-row items-center"
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="color-palette-outline" size={16} color="black" />
              <Text className="ml-1">Color</Text>
              <Ionicons name="chevron-down" size={16} color="black" className="ml-1" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Swiper */}
      <View className="flex-1 px-4">
        <Swiper
          ref={swiperRef}
          cards={DEMO_PRODUCTS}
          renderCard={(product: Product) => (
            <ProductCard product={product} />
          )}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          cardIndex={0}
          backgroundColor={"transparent"}
          stackSize={3}
          cardVerticalMargin={10}
          cardHorizontalMargin={10}
          containerStyle={{ backgroundColor: 'transparent' }}
          onSwipedLeft={() => console.log("onSwipedLeft")}
          onSwipedRight={() => console.log("onSwipedRight")}
          onSwipedTop={() => console.log("onSwipedTop")}
          overlayLabels={{
            left: {
              element: (
                <View className="flex-1 absolute top-0 left-0 right-0 bottom-[23%] rounded-lg bg-black/50 justify-center items-center">
                  <Ionicons name="close" size={80} color="white" />
                </View>
              ),
            },
            right: {
              element: (
                <View className="flex-1 absolute top-0 left-0 right-0 bottom-[23%] rounded-lg bg-black/50 justify-center items-center">
                  <Ionicons name="heart" size={80} color="white" />
                </View>
              ),
            },
            top: {
              element: (
                <View className="flex-1 absolute top-0 left-0 right-0 bottom-[23%] rounded-lg bg-black/50 justify-center items-center">
                  <Ionicons name="cart" size={80} color="white" />
                </View>
              ),
            }
          }}
        />
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={() => {
          console.log('Applying filters');
          setShowFilters(false);
        }}
        onClear={() => {
          console.log('Clearing filters');
          setShowFilters(false);
        }}
      />
    </SafeAreaView>
  );
}
