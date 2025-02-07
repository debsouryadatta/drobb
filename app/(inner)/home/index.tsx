import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { useRouter } from "expo-router";
import ProductCard from "../../../components/product-card";
import FilterModal from "../../../components/filter-modal";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const swiperRef = useRef<Swiper<any>>(null);
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchProducts = async (pageNumber: number, reset: boolean = false) => {
    if (isLoading || (!hasMore && !reset)) return;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/products?page=${pageNumber}&limit=40`
      );
      const { products: newProducts, pagination } = response.data;
      setTotalPages(pagination.pages);
      setHasMore(pageNumber < pagination.pages);
      if (newProducts.length === 0) {
        setHasMore(false);
        return;
      }
      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts: any) => [...prevProducts, ...newProducts]);
      }
      setPage(pageNumber + 1);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error fetching products",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset everything and fetch first page
    setPage(1);
    setHasMore(true);
    setProducts([]);
    fetchProducts(1, true);
  }, []);

  const onSwipedLeft = (cardIndex: number) => {
    console.log("Swiped left");
  };

  const onSwipedRight = async (cardIndex: number) => {
    if (cardIndex < products.length) {
      const product = products[cardIndex];
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/matches`,
          {
            productId: product.id,
            status: "LIKED",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Toast.show({
          type: "success",
          text1: "Matched!",
          text2: "You liked the product.",
        });
      } catch (error) {
        console.error("Error matching product", error);
        Toast.show({
          type: "error",
          text1: "Matching Error",
          text2: "Could not match with the product.",
        });
      }
    }
  };

  const onSwipedTop = async (cardIndex: number) => {
    if (cardIndex < products.length) {
      const product = products[cardIndex];

      //first available size is picked
      const defaultSize =
        product.size && product.size.length > 0 ? product.size[0] : "";

      if (!defaultSize) {
        Toast.show({
          type: "error",
          text1: "Size not available",
          text2:
            "This product does not have available sizes. Please choose from the product details.",
        });
        return;
      }

      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Toast.show({
            type: "error",
            text1: "Authentication error",
            text2: "User not logged in",
          });
          return;
        }

        const payload = {
          productId: product.id,
          quantity: 1,
          size: defaultSize,
        };

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/cart/add`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        Toast.show({
          type: "success",
          text1: "Cart Updated",
          text2: response.data.message,
        });
      } catch (error) {
        console.error("Error adding to cart", error);
        Toast.show({
          type: "error",
          text1: "Add to Cart Failed",
          text2: "There was a problem adding the item to your cart",
        });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View className="px-4 pb-4 mt-5">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => {
              swiperRef.current?.swipeBack();
              Toast.show({
                type: "info",
                text1: "Returning previous card",
                visibilityTime: 3000,
                autoHide: true,
              });
            }}
          >
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
              <Ionicons
                name="chevron-down"
                size={16}
                color="black"
                className="ml-1"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 px-4 py-2 rounded-full flex-row items-center"
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="grid-outline" size={16} color="black" />
              <Text className="ml-1">Product</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color="black"
                className="ml-1"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-100 px-4 py-2 rounded-full flex-row items-center"
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="color-palette-outline" size={16} color="black" />
              <Text className="ml-1">Color</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color="black"
                className="ml-1"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* Swiper */}
      <View className="flex-1 px-4">
        <Swiper
          ref={swiperRef}
          cards={products}
          renderCard={(product: any) => (
            <ProductCard
              product={product}
              onPress={() =>
                router.push(`/product/${product.id}?reload=${Date.now()}`)
              }
            />
          )}
          onSwiped={(cardIndex) => {
            if (cardIndex > products.length * 0.75 && hasMore && !isLoading) {
              fetchProducts(page, false);
            }
          }}
          onSwipedAll={() => {
            if (page <= totalPages) {
              fetchProducts(page, false);
            } else {
              Toast.show({
                type: "info",
                text1: "No more products",
                text2: "You've seen all available products",
              });
            }
          }}
          cardIndex={0}
          backgroundColor={"transparent"}
          stackSize={3}
          cardVerticalMargin={10}
          cardHorizontalMargin={10}
          containerStyle={{ backgroundColor: "transparent" }}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          onSwipedTop={onSwipedTop}
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
            },
          }}
        />
      </View>
      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={() => {
          console.log("Applying filters");
          setShowFilters(false);
        }}
        onClear={() => {
          console.log("Clearing filters");
          setShowFilters(false);
        }}
      />
    </SafeAreaView>
  );
}
