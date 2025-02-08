import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchOrders = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: "User not logged in",
        });
        setLoading(false);
        setRefreshing(false);
        return;
      }
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/orders/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Fetching orders error:", error);
      Toast.show({
        type: "error",
        text1: "Order Error",
        text2: "Unable to fetch orders",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }: { item: any }) => {
    let statusIcon: string;
    if (item.status.toLowerCase() === "completed") {
      statusIcon = "checkmark-circle-outline";
    } else if (item.status.toLowerCase() === "cancelled") {
      statusIcon = "close-circle-outline";
    } else if (item.status.toLowerCase() === "processing") {
      statusIcon = "reload-circle-outline";
    } else {
      statusIcon = "information-circle-outline";
    }

    return (
      <View
        className="bg-white rounded-xl p-4 mb-4 border border-gray-300"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center mb-2">
          <Ionicons
            name={statusIcon as any}
            size={24}
            color="#000"
            className="mr-2"
          />
          <Text className="text-lg font-bold text-black">
            Order ID: {item.id}
          </Text>
        </View>
        <Text className="text-base text-black mb-1">Status: {item.status}</Text>
        <Text className="text-base text-black mb-1">Total: ₹{item.total}</Text>
        <Text className="text-base text-black">
          Ordered on: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Updated Header */}
      <View className="flex-row justify-center items-center mt-4 mb-4 border-b border-gray-300 pb-2">
        <Text className="text-black text-2xl font-extrabold">
          Order History
        </Text>
      </View>
      <View className="flex-1 p-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : orders.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="file-tray-outline" size={64} color="#000" />
            <Text className="mt-4 text-lg text-black">No orders found</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchOrders(true)}
                tintColor="#000"
              />
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
