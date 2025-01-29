import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PastOrderScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold">Past Orders</Text>
        <View style={{ width: 28 }} /> {/* Empty view for balanced spacing */}
      </View>
      
      <View className="flex-1 items-center justify-center px-4">
        <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-6">
          <Ionicons name="cube-outline" size={48} color="#000" />
        </View>
        <Text className="text-2xl font-semibold mb-2">No Past Orders!</Text>
        <Text className="text-gray-500 text-center">
          Purchase items by swiping up and viewing your cart
        </Text>
      </View>
    </SafeAreaView>
  )
}