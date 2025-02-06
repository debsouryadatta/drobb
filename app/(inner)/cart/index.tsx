import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Toast from 'react-native-toast-message'

const SIZES = ['XS', 'S', 'M', 'L', 'XL'] // Standard sizes
const NUMBERED_SIZES = ['24', '26', '28', '30', '32'] // For jeans

interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  size: string
  image: string
  estimatedDelivery: string
  quantity: number
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Core Contour Bodysuit',
    brand: 'Hello Molly',
    price: 35,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=500',
    estimatedDelivery: 'Jan 27 - Jan 31',
    quantity: 1
  },
  {
    id: 2,
    name: 'Malvina Linen Dress',
    brand: 'Reformation',
    price: 248,
    size: 'S',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500',
    estimatedDelivery: 'Jan 27 - Feb 03',
    quantity: 1
  },
  {
    id: 3,
    name: 'Corset top',
    brand: 'Bershka',
    price: 36,
    size: 'L',
    image: 'https://images.unsplash.com/photo-1602573991155-21f0143bb45c?q=80&w=500',
    estimatedDelivery: 'Jan 28 - Feb 01',
    quantity: 1
  },
  {
    id: 4,
    name: 'Summer Floral Maxi',
    brand: 'Free People',
    price: 168,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500',
    estimatedDelivery: 'Jan 29 - Feb 02',
    quantity: 1
  },
  {
    id: 5,
    name: 'Denim High-Rise Jeans',
    brand: 'Levi\'s',
    price: 98,
    size: '28',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500',
    estimatedDelivery: 'Jan 28 - Feb 01',
    quantity: 1
  },
  {
    id: 6,
    name: 'Silk Cami Top',
    brand: 'Everlane',
    price: 85,
    size: 'S',
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=500',
    estimatedDelivery: 'Jan 30 - Feb 03',
    quantity: 1
  },
  {
    id: 7,
    name: 'Knit Sweater',
    brand: '& Other Stories',
    price: 89,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500',
    estimatedDelivery: 'Jan 29 - Feb 02',
    quantity: 1
  },
  {
    id: 8,
    name: 'Pleated Mini Skirt',
    brand: 'Sandro',
    price: 245,
    size: 'XS',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=500',
    estimatedDelivery: 'Jan 31 - Feb 04',
    quantity: 1
  }
]

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [showSizes, setShowSizes] = useState<number | null>(null)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const clearCart = () => {
    setCartItems([])
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change) // Prevent going below 1
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const updateSize = (id: number, newSize: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, size: newSize }
      }
      return item
    }))
    setShowSizes(null) // Hide size selector after selection
  }

  const handleCheckout = () => {
    // Handle checkout logic here
    Toast.show({
      type: "success",
      text1: "Checkout",
      text2: "Checkout successful!"
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="h-[90%]">
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
        <View className="px-4 py-3 border-b border-gray-200">
          <Text className="text-lg">
            Subtotal: <Text className="font-semibold">₹{subtotal}</Text>
          </Text>
        </View>

        {/* Cart Items */}
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {cartItems.map((item) => (
            <View key={item.id} className="flex-row p-4 border-b border-gray-200">
              <Image
                source={{ uri: item.image }}
                className="w-24 h-32 rounded-lg"
              />
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-lg font-medium">{item.name}</Text>
                    <Text className="text-gray-600 mb-2">{item.brand}</Text>
                    <Text className="font-medium">₹{item.price * item.quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                {/* Size Selector */}
                <View className="mt-2">
                  <Text className="text-gray-600 mb-1">Select a size:</Text>
                  <TouchableOpacity 
                    onPress={() => setShowSizes(showSizes === item.id ? null : item.id)}
                    className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2"
                  >
                    <Text>Size:</Text>
                    <View className="flex-row items-center flex-1 justify-between ml-2">
                      <Text>{item.size}</Text>
                      <Ionicons 
                        name={showSizes === item.id ? "chevron-up" : "chevron-down"} 
                        size={16} 
                        color="#666" 
                      />
                    </View>
                  </TouchableOpacity>
                  
                  {/* Size Options */}
                  {showSizes === item.id && (
                    <View className="mt-2 bg-gray-100 rounded-lg p-2">
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {(item.name.toLowerCase().includes('jeans') ? NUMBERED_SIZES : SIZES).map((size) => (
                          <TouchableOpacity
                            key={size}
                            onPress={() => updateSize(item.id, size)}
                            className={`px-4 py-2 rounded-lg mr-2 ₹{
                              item.size === size ? 'bg-black' : 'bg-white'
                            }`}
                          >
                            <Text className={item.size === size ? 'text-white' : 'text-black'}>
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
                <View className="flex-row items-center mt-3">
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text className="text-gray-600 text-sm ml-1">
                    Estimated arrival {item.estimatedDelivery}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Checkout Button */}
        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity onPress={handleCheckout} className="bg-black py-4 rounded-xl">
            <Text className="text-white text-center font-medium">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}