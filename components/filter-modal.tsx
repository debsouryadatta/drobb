import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
};

export default function FilterModal({ visible, onClose, onApply, onClear }: FilterModalProps) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalTranslateY, {
          toValue: Dimensions.get('window').height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Animated.View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            opacity: overlayOpacity,
          }}
        />
        <Animated.View
          style={{
            transform: [{ translateY: modalTranslateY }],
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
          }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-semibold">Add Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl">×</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="border border-gray-200 rounded-lg p-4 mb-3">
            <Text className="text-base">Brands</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-gray-200 rounded-lg p-4 mb-3">
            <Text className="text-base">Colors / Patterns</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-gray-200 rounded-lg p-4 mb-6">
            <Text className="text-base">Product Type</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onApply}
            className="bg-black rounded-lg p-4 mb-3"
          >
            <Text className="text-white text-center text-base">Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onClear}
            className="border border-gray-200 rounded-lg p-4"
          >
            <Text className="text-center text-base">Clear Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
